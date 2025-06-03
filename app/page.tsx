import { BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { Icon, Text, View } from "reshaped";
import { ItemList } from "./_components/item-list";
import { Uploader } from "./_components/uploader";
import { bucketItems } from "./_lib/bucket-items";
import BucketItemsContextProvider from "./_providers/bucket-items";

export const dynamic = "force-dynamic";

export default function Page() {
	return (
		<BucketItemsContextProvider items={bucketItems()}>
			<View gap={12} align={"center"}>
				<View.Item columns={10}>
					<View gap={4} textAlign={"center"} paddingBlock={10}>
						<Icon svg={BuildingLibraryIcon} size={14} />
						<Text as="h1" variant="title-6">
							File Store
						</Text>
						<Text as="h2" variant="featured-2">
							Browse, upload, and download files from a Bucket.
						</Text>
					</View>
					<View backgroundColor="primary-faded" borderRadius={"medium"}>
						<Uploader />
					</View>
				</View.Item>
				<View.Item columns={10}>
					<ItemList />
				</View.Item>
			</View>
		</BucketItemsContextProvider>
	);
}
