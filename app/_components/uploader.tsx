"use client";

import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { FileUpload, Icon, Text, View } from "reshaped";
import { presignedUploadUrls } from "../_actions/presigned-urls";
import { useBucketItems, type ItemAction } from "../_providers/bucket-items";

export function Uploader() {
	const { setItems } = useBucketItems();

	return (
		<FileUpload
			name="file"
			onChange={async ({ value: files }) => {
				setItems({
					kind: "add",
					items: files.map((file) => ({
						key: file.name,
						status: "uploading" as const,
					})),
				});
				try {
					await uploadFiles(files, setItems);
				} catch {
					setItems({
						kind: "replace",
						items: files.map((file) => ({
							key: file.name,
							status: "failed" as const,
						})),
					});
				}
			}}
		>
			<View gap={2}>
				<Icon svg={ArrowUpTrayIcon} size={6} />
				<Text color="neutral-faded" variant="body-2">
					Drop files to upload
				</Text>
			</View>
		</FileUpload>
	);
}

export async function uploadFiles(files: File[], setItems: (action: ItemAction) => void) {
	const links = await presignedUploadUrls({ keys: files.map((file) => file.name) });
	for (const link of links) {
		const file = files.find((file) => file.name === link.key);
		if (file) {
			try {
				await uploadToS3(link.url, file);
				setItems({
					kind: "replace",
					items: [
						{
							key: file.name,
							status: "uploaded" as const,
						},
					],
				});
			} catch {
				setItems({
					kind: "replace",
					items: [
						{
							key: file.name,
							status: "failed" as const,
						},
					],
				});
			}
		}
	}
}

async function uploadToS3(presignedUrl: string, file: File) {
	// Upload the file to S3 using the presigned URL
	const result = await fetch(presignedUrl, {
		method: "PUT",
		headers: {
			"Content-Type": file.type,
		},
		body: file,
	});

	if (!result.ok) {
		throw new Error(`File upload failed ${result.statusText}`);
	}
}
