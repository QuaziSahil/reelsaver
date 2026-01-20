import { NextRequest, NextResponse } from 'next/server';

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

        // Try multiple free methods
        let result = null;

        // Method 1: SSS Instagram API (Free, no key)
        result = await trySSSInsta(cleanUrl);
        if (result) return successResponse(result, shortcode, postType);

        // Method 2: SnapSave API (Free, no key)
        result = await trySnapSave(cleanUrl);
        if (result) return successResponse(result, shortcode, postType);

        // Method 3: iGram API (Free, no key)
        result = await tryIGram(cleanUrl);
        if (result) return successResponse(result, shortcode, postType);

        // Method 4: Embed extraction as last resort
        result = await tryEmbedMethod(shortcode);
        if (result) return successResponse(result, shortcode, postType);

        // All methods failed
        return NextResponse.json({
            error: 'Unable to download this video right now. Instagram may be blocking access.',
            tip: 'Please try again in a few minutes or try a different post.',
        }, { status: 404 });

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({
            error: 'Server error. Please try again.',
        }, { status: 500 });
    }
}

// Method 1: SSS Instagram API (used by sssinstagram.com)
async function trySSSInsta(url: string): Promise<any> {
    try {
        const formData = new URLSearchParams();
        formData.append('url', url);
        formData.append('locale', 'en');

        const response = await fetch('https://sssinstagram.com/api/instagram', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Origin': 'https://sssinstagram.com',
                'Referer': 'https://sssinstagram.com/',
            },
            body: formData.toString(),
        });

        if (!response.ok) return null;

        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const item = data.items[0];
            const video = item.urls?.find((u: any) => u.type === 'video') || item.urls?.[0];

            if (video?.url) {
                return {
                    videoUrl: video.url,
                    thumbnailUrl: item.thumb || item.thumbnail,
                    isVideo: video.type === 'video',
                };
            }
        }
        return null;
    } catch {
        return null;
    }
}

// Method 2: SnapSave API
async function trySnapSave(url: string): Promise<any> {
    try {
        const formData = new URLSearchParams();
        formData.append('url', url);

        const response = await fetch('https://snapsave.app/action.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Origin': 'https://snapsave.app',
                'Referer': 'https://snapsave.app/',
            },
            body: formData.toString(),
        });

        if (!response.ok) return null;

        const text = await response.text();

        // Parse the HTML response for video URLs
        const urlMatches = text.match(/https?:\/\/[^\s"'<>]+\.mp4[^\s"'<>]*/gi);
        if (urlMatches && urlMatches.length > 0) {
            return {
                videoUrl: urlMatches[0].replace(/\\/g, ''),
                thumbnailUrl: null,
                isVideo: true,
            };
        }

        // Try to find any download URL
        const downloadMatch = text.match(/href="(https?:\/\/[^"]+)"/);
        if (downloadMatch) {
            return {
                videoUrl: downloadMatch[1],
                thumbnailUrl: null,
                isVideo: true,
            };
        }
        return null;
    } catch {
        return null;
    }
}

// Method 3: iGram API
async function tryIGram(url: string): Promise<any> {
    try {
        const formData = new URLSearchParams();
        formData.append('url', url);

        const response = await fetch('https://api.igram.world/api/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Origin': 'https://igram.world',
                'Referer': 'https://igram.world/',
            },
            body: formData.toString(),
        });

        if (!response.ok) return null;

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const video = data.results.find((r: any) => r.type === 'video') || data.results[0];
            if (video?.url) {
                return {
                    videoUrl: video.url,
                    thumbnailUrl: video.thumbnail,
                    isVideo: video.type === 'video',
                };
            }
        }
        return null;
    } catch {
        return null;
    }
}

// Method 4: Embed extraction (last resort)
async function tryEmbedMethod(shortcode: string): Promise<any> {
    try {
        // Try the JSON API endpoint
        const apiUrl = `https://www.instagram.com/api/v1/media/${shortcode}/info/`;

        const response = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'Instagram 275.0.0.27.98 Android (33/13; 420dpi; 1080x2400; samsung; SM-G991B; o1s; exynos2100)',
                'Accept': '*/*',
                'X-IG-App-ID': '936619743392459',
            },
        });

        if (!response.ok) return null;

        const data = await response.json();
        const item = data.items?.[0];

        if (item?.video_versions?.[0]?.url) {
            return {
                videoUrl: item.video_versions[0].url,
                thumbnailUrl: item.image_versions2?.candidates?.[0]?.url,
                isVideo: true,
            };
        }
        return null;
    } catch {
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
