import { Suspense } from "react";
import { Table } from "reshaped";
import { Items } from "./items";
import { ItemsSkeleton } from "./skeleton";

export async function ItemList() {
	return (
		<Table border>
			<Table.Row highlighted>
				<Table.Heading colSpan={2}>File</Table.Heading>
			</Table.Row>
			<Suspense fallback={<ItemsSkeleton />}>
				<Items />
			</Suspense>
		</Table>
	);
}
