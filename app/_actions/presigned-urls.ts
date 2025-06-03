"use server";

import documents from "@/workloads/documents";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../_lib/s3-client";

export async function presignedUploadUrls(opts: { keys: string[] }) {
	return await Promise.all(
		opts.keys.map(async (key) => {
			const command = new PutObjectCommand({
				Key: key,
				Bucket: documents.name,
			});
			return { key, url: await getSignedUrl(s3Client, command) };
		}),
	);
}

export async function presignedDownloadUrl(opts: { key: string }) {
	const command = new GetObjectCommand({
		Key: opts.key,
		Bucket: documents.name,
	});
	return await getSignedUrl(s3Client, command);
}
