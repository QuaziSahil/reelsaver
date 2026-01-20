import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Clean the URL
        const cleanUrl = url.split('?')[0].replace(/\/$/, '');

        // Validate Instagram URL
        const isInstagram = /instagram\.com\/(p|reel|reels|tv|stories)\//.test(cleanUrl);
        if (!isInstagram) {
            return NextResponse.json({ error: 'Invalid Instagram URL' }, { status: 400 });
        }

        // Extract shortcode for filename
        const shortcodeMatch = cleanUrl.match(/\/(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
        const shortcode = shortcodeMatch ? shortcodeMatch[2] : 'video';
        const postType = shortcodeMatch ? shortcodeMatch[1] : 'post';

        // Use Cobalt API - Free, open-source video downloader
        // Documentation: https://github.com/wukko/cobalt
        const cobaltResponse = await fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: cleanUrl,
                vCodec: 'h264',
                vQuality: '720',
                aFormat: 'mp3',
                filenamePattern: 'basic',
                isAudioOnly: false,
                isTTFullAudio: false,
                isAudioMuted: false,
                dubLang: false,
                disableMetadata: false,
            }),
        });

        if (!cobaltResponse.ok) {
            // Try alternative Cobalt instance
            const altResponse = await fetch('https://co.wuk.sh/api/json', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: cleanUrl,
                    vCodec: 'h264',
                    vQuality: '720',
                    aFormat: 'mp3',
                }),
            });

            if (!altResponse.ok) {
                throw new Error('Both Cobalt instances failed');
            }

            const altData = await altResponse.json();
            return handleCobaltResponse(altData, shortcode, postType);
        }

        const cobaltData = await cobaltResponse.json();
        return handleCobaltResponse(cobaltData, shortcode, postType);

    } catch (error) {
        console.error('Instagram fetch error:', error);

        // Provide helpful error message
        return NextResponse.json({
            error: 'Unable to download this video. Please make sure the post is public and try again.',
            tip: 'If the problem persists, the video may be from a private account.',
        }, { status: 500 });
    }
}

function handleCobaltResponse(data: any, shortcode: string, postType: string) {
    // Cobalt returns different response types
    if (data.status === 'error') {
        return NextResponse.json({
            error: data.text || 'Could not process video',
        }, { status: 400 });
    }

    if (data.status === 'redirect' || data.status === 'stream') {
        // Direct URL to media
        return NextResponse.json({
            success: true,
            data: {
                videoUrl: data.url,
                thumbnailUrl: null,
                shortcode,
                type: postType === 'reel' || postType === 'reels' ? 'reel' : 'post',
                isVideo: true,
                filename: data.filename || `instagram_${shortcode}.mp4`,
            }
        });
    }

    if (data.status === 'picker' && data.picker && data.picker.length > 0) {
        // Multiple media (carousel) - return first video or all
        const videos = data.picker.filter((item: any) => item.type === 'video');
        const media = videos.length > 0 ? videos[0] : data.picker[0];

        return NextResponse.json({
            success: true,
            data: {
                videoUrl: media.url,
                thumbnailUrl: media.thumb || null,
                shortcode,
                type: postType === 'reel' || postType === 'reels' ? 'reel' : 'post',
                isVideo: media.type === 'video',
                filename: `instagram_${shortcode}.${media.type === 'video' ? 'mp4' : 'jpg'}`,
                // Include all media for carousel support
                allMedia: data.picker.map((item: any) => ({
                    url: item.url,
                    thumb: item.thumb,
                    type: item.type,
                })),
            }
        });
    }

    // Unknown response format
    return NextResponse.json({
        error: 'Unexpected response format',
        debug: data,
    }, { status: 500 });
}
