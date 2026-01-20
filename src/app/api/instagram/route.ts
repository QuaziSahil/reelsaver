import { NextRequest, NextResponse } from 'next/server';

const USER_AGENTS = {
    mobile: 'Instagram 275.0.0.27.98 Android (33/13; 420dpi; 1080x2400; samsung; SM-G991B; o1s; exynos2100; en_US; 458229237)',
    desktop: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
};

export async function POST(request: NextRequest) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Clean and validate URL
        const cleanUrl = url.split('?')[0].replace(/\/$/, '');
        const shortcodeMatch = cleanUrl.match(/\/(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);

        if (!shortcodeMatch) {
            return NextResponse.json({ error: 'Invalid Instagram URL format' }, { status: 400 });
        }

        const shortcode = shortcodeMatch[2];
        const postType = shortcodeMatch[1];

        // Try multiple extraction methods
        let result = null;

        // Method 1: Instagram GraphQL API (most reliable)
        result = await tryGraphQLAPI(shortcode);
        if (result) return successResponse(result, shortcode, postType);

        // Method 2: Instagram's public feed API
        result = await tryPublicAPI(shortcode);
        if (result) return successResponse(result, shortcode, postType);

        // Method 3: Embed page parsing
        result = await tryEmbedExtraction(shortcode);
        if (result) return successResponse(result, shortcode, postType);

        // Method 4: Use external service as last resort
        result = await tryExternalService(cleanUrl);
        if (result) return successResponse(result, shortcode, postType);

        // All methods failed
        return NextResponse.json({
            error: 'Could not extract video. Instagram may have restricted access to this content.',
            suggestion: 'Try a different reel or make sure the account is public.',
        }, { status: 404 });

    } catch (error) {
        console.error('Instagram API error:', error);
        return NextResponse.json({
            error: 'Server error while processing request. Please try again.',
        }, { status: 500 });
    }
}

async function tryGraphQLAPI(shortcode: string): Promise<any> {
    try {
        // Instagram GraphQL endpoint
        const graphqlUrl = `https://www.instagram.com/api/v1/media/${shortcode}/info/`;

        const response = await fetch(graphqlUrl, {
            headers: {
                'User-Agent': USER_AGENTS.mobile,
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.9',
                'X-IG-App-ID': '936619743392459',
                'X-ASBD-ID': '198387',
                'X-IG-WWW-Claim': '0',
                'Origin': 'https://www.instagram.com',
                'Referer': 'https://www.instagram.com/',
            },
        });

        if (!response.ok) return null;

        const data = await response.json();
        const item = data.items?.[0];

        if (!item) return null;

        // Extract video URL
        let videoUrl = null;
        let thumbnailUrl = null;

        if (item.video_versions) {
            // It's a video/reel
            videoUrl = item.video_versions[0]?.url;
            thumbnailUrl = item.image_versions2?.candidates?.[0]?.url;
        } else if (item.carousel_media) {
            // Carousel - get first video
            const video = item.carousel_media.find((m: any) => m.video_versions);
            if (video) {
                videoUrl = video.video_versions[0]?.url;
                thumbnailUrl = video.image_versions2?.candidates?.[0]?.url;
            } else {
                // No video in carousel, get first image
                thumbnailUrl = item.carousel_media[0]?.image_versions2?.candidates?.[0]?.url;
                videoUrl = thumbnailUrl;
                return { videoUrl, thumbnailUrl, isVideo: false };
            }
        } else if (item.image_versions2) {
            // It's an image
            thumbnailUrl = item.image_versions2.candidates?.[0]?.url;
            videoUrl = thumbnailUrl;
            return { videoUrl, thumbnailUrl, isVideo: false };
        }

        if (!videoUrl) return null;

        return { videoUrl, thumbnailUrl, isVideo: true };
    } catch (e) {
        console.error('GraphQL method failed:', e);
        return null;
    }
}

async function tryPublicAPI(shortcode: string): Promise<any> {
    try {
        // Try the public JSON endpoint
        const url = `https://www.instagram.com/p/${shortcode}/?__a=1&__d=dis`;

        const response = await fetch(url, {
            headers: {
                'User-Agent': USER_AGENTS.mobile,
                'Accept': 'application/json',
                'X-IG-App-ID': '936619743392459',
            },
        });

        if (!response.ok) return null;

        const data = await response.json();
        const media = data.graphql?.shortcode_media || data.items?.[0];

        if (!media) return null;

        const videoUrl = media.video_url || media.video_versions?.[0]?.url;
        const thumbnailUrl = media.display_url || media.thumbnail_url;

        if (!videoUrl && !thumbnailUrl) return null;

        return {
            videoUrl: videoUrl || thumbnailUrl,
            thumbnailUrl,
            isVideo: !!videoUrl,
        };
    } catch (e) {
        console.error('Public API method failed:', e);
        return null;
    }
}

async function tryEmbedExtraction(shortcode: string): Promise<any> {
    try {
        const embedUrl = `https://www.instagram.com/p/${shortcode}/embed/captioned/`;

        const response = await fetch(embedUrl, {
            headers: {
                'User-Agent': USER_AGENTS.desktop,
                'Accept': 'text/html',
            },
        });

        if (!response.ok) return null;

        const html = await response.text();

        // Try to find video URL in various patterns
        const patterns = [
            /"video_url":"([^"]+)"/,
            /video_url\\?":\\?"([^"\\]+)/,
            /src="([^"]*\.mp4[^"]*)"/i,
            /data-video-url="([^"]+)"/,
        ];

        let videoUrl = null;
        for (const pattern of patterns) {
            const match = html.match(pattern);
            if (match) {
                videoUrl = match[1]
                    .replace(/\\u0026/g, '&')
                    .replace(/\\/g, '')
                    .replace(/&amp;/g, '&');
                break;
            }
        }

        // Get thumbnail
        const thumbMatch = html.match(/property="og:image"[^>]*content="([^"]+)"/);
        const thumbnailUrl = thumbMatch ? thumbMatch[1] : null;

        if (!videoUrl) return null;

        return { videoUrl, thumbnailUrl, isVideo: true };
    } catch (e) {
        console.error('Embed extraction failed:', e);
        return null;
    }
}

async function tryExternalService(url: string): Promise<any> {
    try {
        // Try RapidSave API (free)
        const apiUrl = `https://api.rapidsave.com/ig?url=${encodeURIComponent(url)}`;

        const response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) return null;

        const data = await response.json();

        if (data.error) return null;

        const videoUrl = data.video_url || data.url;
        const thumbnailUrl = data.thumbnail_url || data.thumbnail;

        if (!videoUrl) return null;

        return { videoUrl, thumbnailUrl, isVideo: true };
    } catch (e) {
        console.error('External service failed:', e);
        return null;
    }
}

function successResponse(data: any, shortcode: string, postType: string) {
    return NextResponse.json({
        success: true,
        data: {
            videoUrl: data.videoUrl,
            thumbnailUrl: data.thumbnailUrl,
            shortcode,
            type: postType === 'reel' || postType === 'reels' ? 'reel' : 'post',
            isVideo: data.isVideo !== false,
            filename: `instagram_${shortcode}.${data.isVideo !== false ? 'mp4' : 'jpg'}`,
        }
    });
}
