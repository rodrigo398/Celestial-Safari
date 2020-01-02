import React, { useState } from "react";
import { Box, Button, DropButton, Text, Image } from "grommet";
import { Calendar, Location } from "grommet-icons";
import InfoPage from "./InfoPage";
import AddToCollection from "./AddToCollection";
import NewCollection from "./NewCollection";
import { useSelector } from "react-redux";

function LaunchCard(props) {
	const [infoPage, setInfoPage] = useState(false);
	const [newCollection, setNewCollection] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);

	const auth = useSelector(state => state.auth);

	const viewInfoPage = () => {
		return () => {
			setInfoPage(!infoPage);
		};
	};
	const toggleNewCollection = () => {
		return () => {
			setNewCollection(!newCollection);
		};
	};
	const toggleDropdown = () => {
		return () => {
			setShowDropdown(!showDropdown);
		};
	};
	return (
		<Box
			border
			animation="slideUp"
			margin="small"
			align="center"
			round
			gap="small"
			justify="evenly"
			pad="small"
			direction="row"
		>
			<Box
				round="full"
				overflow="hidden"
				width={{ min: "xsmall", max: "xsmall" }}
				height={{ min: "xsmall", max: "xsmall" }}
			>
				<Image src={props.img} fill fit="cover"></Image>
			</Box>
			<Box>
				<Text size="xlarge" textAlign="center">
					{props.title}
				</Text>
				{props.location !== "" && (
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
							label="Add"
							fill="horizontal"
							dropAlign={{
								top: "bottom",
								right: "right"
							}}
							dropContent={
								<AddToCollection
									itemId={props.itemId}
									type="launch"
									showNewCollection={toggleNewCollection()}
									hideDropContent={toggleDropdown()}
									onChange={props.onChange}
								></AddToCollection>
							}
							onOpen={toggleDropdown()}
							onClose={toggleDropdown()}
							open={showDropdown}
							primary
						/>
					)}
					<NewCollection
						invisible={toggleNewCollection()}
						open={newCollection}
						type="launch"
						itemId={props.itemId}
					></NewCollection>
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
		</Box>
	);
}

export default LaunchCard;
