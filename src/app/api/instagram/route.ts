import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Clean the URL
        const cleanUrl = url.split('?')[0].replace(/\/$/, '');

        // Extract shortcode from URL
        const shortcodeMatch = cleanUrl.match(/\/(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
        if (!shortcodeMatch) {
            return NextResponse.json({ error: 'Invalid Instagram URL' }, { status: 400 });
        }

        const shortcode = shortcodeMatch[2];
        const postType = shortcodeMatch[1];

        // Method 1: Try Instagram's embed endpoint
        const embedUrl = `https://www.instagram.com/p/${shortcode}/embed/`;

        const embedResponse = await fetch(embedUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Referer': 'https://www.instagram.com/',
            },
        });

        if (!embedResponse.ok) {
            throw new Error('Failed to fetch embed page');
        }

        const embedHtml = await embedResponse.text();

        // Try to extract video URL from embed HTML
        let videoUrl = null;
        let thumbnailUrl = null;
        let isVideo = true;

        // Pattern 1: Look for video_url in the script data
        const videoUrlMatch = embedHtml.match(/"video_url":"([^"]+)"/);
        if (videoUrlMatch) {
            videoUrl = videoUrlMatch[1].replace(/\\u0026/g, '&').replace(/\\/g, '');
        }

        // Pattern 2: Look for og:video meta tag
        if (!videoUrl) {
            const ogVideoMatch = embedHtml.match(/property="og:video"[^>]*content="([^"]+)"/);
            if (ogVideoMatch) {
                videoUrl = ogVideoMatch[1];
            }
        }

        // Pattern 3: Look for video source in embed
        if (!videoUrl) {
            const srcMatch = embedHtml.match(/src="([^"]*\.mp4[^"]*)"/i);
            if (srcMatch) {
                videoUrl = srcMatch[1].replace(/&amp;/g, '&');
            }
        }

        // Pattern 4: Look in window._sharedData or embedded JSON
        if (!videoUrl) {
            const sharedDataMatch = embedHtml.match(/window\._sharedData\s*=\s*({.+?});/);
            if (sharedDataMatch) {
                try {
                    const sharedData = JSON.parse(sharedDataMatch[1]);
                    const media = sharedData?.entry_data?.PostPage?.[0]?.graphql?.shortcode_media;
                    if (media?.video_url) {
                        videoUrl = media.video_url;
                    }
                    if (media?.display_url) {
                        thumbnailUrl = media.display_url;
                    }
                } catch {
                    // JSON parse failed
                }
            }
        }

        // Pattern 5: Look for video in EmbeddedMediaPage
        if (!videoUrl) {
            const mediaMatch = embedHtml.match(/"media":\s*({[^}]+})/);
            if (mediaMatch) {
                try {
                    // Try to extract video_url from partial JSON
                    const urlMatch = mediaMatch[1].match(/"video_url":\s*"([^"]+)"/);
                    if (urlMatch) {
                        videoUrl = urlMatch[1].replace(/\\u0026/g, '&').replace(/\\/g, '');
                    }
                } catch {
                    // Failed to parse
                }
            }
        }

        // Pattern 6: Try fetching the raw post page with __a=1
        if (!videoUrl) {
            try {
                const apiUrl = `https://www.instagram.com/p/${shortcode}/?__a=1&__d=dis`;
                const apiResponse = await fetch(apiUrl, {
                    headers: {
                        'User-Agent': 'Instagram 219.0.0.12.117 Android',
                        'Accept': '*/*',
                    },
                });

                if (apiResponse.ok) {
                    const apiData = await apiResponse.json();
                    const items = apiData?.items || apiData?.graphql?.shortcode_media;
                    if (items) {
                        const media = Array.isArray(items) ? items[0] : items;
                        videoUrl = media?.video_versions?.[0]?.url || media?.video_url;
                        thumbnailUrl = media?.image_versions2?.candidates?.[0]?.url || media?.display_url;
                    }
                }
            } catch {
                // API method failed
            }
        }

        // Get thumbnail if not found
        if (!thumbnailUrl) {
            const thumbMatch = embedHtml.match(/property="og:image"[^>]*content="([^"]+)"/);
            if (thumbMatch) {
                thumbnailUrl = thumbMatch[1];
            }
        }

        // If still no video, it might be an image post
        if (!videoUrl) {
            const imageMatch = embedHtml.match(/class="EmbeddedMediaImage"[^>]*src="([^"]+)"/);
            if (imageMatch) {
                videoUrl = imageMatch[1];
                isVideo = false;
            }
        }

        // Final fallback - check for any mp4 URL
        if (!videoUrl) {
            const mp4Match = embedHtml.match(/https?:\/\/[^"'\s]+\.mp4[^"'\s]*/);
            if (mp4Match) {
                videoUrl = mp4Match[0].replace(/&amp;/g, '&');
            }
        }

        if (!videoUrl) {
            return NextResponse.json({
                error: 'Could not extract media. The post may be private or unavailable.',
                debug: {
                    shortcode,
                    embedFetched: true,
                    htmlLength: embedHtml.length,
                }
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: {
                videoUrl,
                thumbnailUrl,
                shortcode,
                type: postType === 'reel' || postType === 'reels' ? 'reel' : 'post',
                isVideo,
            }
        });

    } catch (error) {
        console.error('Instagram fetch error:', error);
        return NextResponse.json({
            error: 'Failed to fetch Instagram content. Please try again.',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
