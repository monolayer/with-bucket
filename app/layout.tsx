import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Reshaped } from "reshaped";
import "reshaped/themes/slate/theme.css";
import "./globals.css";

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "File Store",
	description: "Browse, upload, and download files from a Bucket.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-rs-theme="slate" data-rs-color-mode="light">
			<body className={`${geistMono.variable} antialiased`}>
				<Reshaped theme="slate" defaultColorMode="light">
					{children}
				</Reshaped>
			</body>
		</html>
	);
}
