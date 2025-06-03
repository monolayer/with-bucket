import { Alert, Table, Text, View } from "reshaped";

export function NoItems() {
	return (
		<Table.Row>
			<Table.Cell verticalAlign="center" colSpan={2}>
				<View paddingInline={10} textAlign={"center"}>
					<Alert color="warning">
						<Text weight={"medium"}>No items</Text>
					</Alert>
				</View>
			</Table.Cell>
		</Table.Row>
	);
}
