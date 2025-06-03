"use client";

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { Button } from "reshaped";
import { presignedDownloadUrl } from "../_actions/presigned-urls";
import type { BucketItem } from "../_lib/bucket-items";

export function DownloadItem({ item }: { item: BucketItem }) {
	const [href, setHref] = useState<string | undefined>(undefined);
	const [loading, setLoading] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (href && buttonRef.current) {
			buttonRef.current.click();
		}
	}, [href, buttonRef]);

	return (
		<Button
			icon={ArrowDownTrayIcon}
			variant="outline"
			ref={buttonRef}
			href={href}
			loading={loading}
			attributes={{
				"aria-label": "Download file",
				download: href ? true : undefined,
				onClickCapture: async (event) => {
					if (!href) {
						event.preventDefault();
						setLoading(true);
						const url = await presignedDownloadUrl({ key: item.key });
						setHref(url);
						setLoading(false);
					}
				},
			}}
		/>
	);
}
