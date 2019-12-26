import React, { useState } from "react";
import { Box, Button, DropButton, List, Text } from "grommet";
import { Calendar, Location } from "grommet-icons";
import InfoPage from "./InfoPage";
import { useSelector } from "react-redux";

function Card(props) {
	const [infoPage, setInfoPage] = useState(false);
	const [selectedCollections, setSelectedCollections] = useState();
	const auth = useSelector(state => state.auth);

	const viewInfoPage = () => {
		return () => {
			setInfoPage(!infoPage);
		};
	};

	const img = "url(" + props.backgroundImg + ")";
	const background = {
		image: img
	};
	return (
		<Box
			border
			animation="slideUp"
			margin="small"
			align="center"
			round
			gap="small"
			background={background}
			justify="between"
			pad="small"
		>
			<Text size="xlarge" textAlign="center">
				{props.title}
			</Text>
			{typeof props.location !== "undefined" && (
				<Text size="large" textAlign="center">
					<Location></Location>
					{props.location}
				</Text>
			)}
			<Text size="large" textAlign="center">
				<Calendar></Calendar>
				{props.date}
			</Text>
			<Box direction="row" gap="medium">
				{auth.isAuthenticated && (
					<DropButton
						alignSelf="stretch"
						label="Add to collection"
						fill="horizontal"
						dropAlign={{ top: "bottom", right: "right" }}
						dropContent={
							<Box pad="small" gap="small">
								<Button
									alignSelf="stretch"
									label="New Collection"
									fill="horizontal"
									onClick={() => {}}
									primary
								/>
								<List
									data={["collection1", "collection2"]}
									onClickItem={event =>
										setSelectedCollections(
											selectedCollections === event.index
												? undefined
												: event.index
										)
									}
								/>
							</Box>
						}
						primary
					/>
				)}
				<Button
					alignSelf="stretch"
					label="Info"
					fill="horizontal"
					onClick={() => {
						// alert("info");
						setInfoPage(true);
					}}
					primary
				/>
			</Box>
			{infoPage && (
				<InfoPage
					itemId={props.itemId}
					showInfoPage={infoPage}
					viewInfoPage={viewInfoPage()}
				></InfoPage>
			)}
		</Box>
	);
}

export default Card;
