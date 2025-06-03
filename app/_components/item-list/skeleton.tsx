import { Skeleton, Table, View } from "reshaped";

export function ItemsSkeleton() {
	return [1, 2].map((_, idx) => (
		<Table.Row key={idx}>
			<Table.Cell verticalAlign="center">
				<Skeleton />
			</Table.Cell>
			<Table.Cell align="end" width={30}>
				<View direction="row" gap={2} align={"end"} justify={"end"}>
					<Skeleton width={9} height={9} />
					<Skeleton width={9} height={9} />
				</View>
			</Table.Cell>
		</Table.Row>
	));
}
