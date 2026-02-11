import { useState, useEffect } from 'react';
import { getImage } from '../db';

// Cache to store fetched image data to avoid redundant DB calls
const imageCache = new Map<string, string>();

export const useSupabaseImage = (src: string | undefined): string => {
    const defaultSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICAgIDxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRTNFNUI4Ii8+CiAgICAgIDxsaW5lIHgxPSIxNTAiIHkxPSIxMDAiIHgyPSI0NTAiIHkyPSIzMDAiIHN0cm9rZT0iIzk1QTNBQiIgc3Ryb2tlLXdpZHRoPSIxMCIvPgogICAgICA8bGluZSB4MT0iNDUwIiB5MT0iMTAwIiB4Mj0iMTUwIiB5Mj0iMzAwIiBzdHJva2U9IiM5NUEzQUIiIHN0cm9rZS13aWR0aD0iMTAiLz4KICAgICAgPHJlY3QgeD0iMjUwIiB5PSIxNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTAiIHN0cm9rZT0iIzk1QTNBQiIgc3Ryb2tlLXdpZHRoPSIxMCIvPgo8L3N2Zz4=';
    const [imageUrl, setImageUrl] = useState(src || defaultSrc);

    useEffect(() => {
        if (!src) {
            setImageUrl(defaultSrc);
            return;
        }

        // Check if the source is a database image ID
        if (src.startsWith('db-image-')) {
            // If image is already in cache, use it
            if (imageCache.has(src)) {
                setImageUrl(imageCache.get(src)!);
                return;
            }

            let isMounted = true;
            getImage(src).then(imageRecord => {
                if (isMounted && imageRecord) {
                    imageCache.set(src, imageRecord.data); // Store in cache
                    setImageUrl(imageRecord.data);
                } else if (isMounted) {
                    setImageUrl(defaultSrc);
                }
            }).catch(() => {
                 if (isMounted) setImageUrl(defaultSrc);
            });
            return () => { isMounted = false; };
        } else {
            // If it's a full URL or a different kind of path, use it directly
            setImageUrl(src);
        }
    }, [src]);

    return imageUrl;
};