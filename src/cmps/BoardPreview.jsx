import { Box, Clickable, Flex, Icon, IconButton, Text, Tooltip } from "monday-ui-react-core"
import { Board, Favorite } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useNavigate } from "react-router-dom"


export function BoardPreview({ board }) {

    const navigate = useNavigate()
    console.log('board from preview:', board)
    return <>
        <Box
            // border={Box.borders.DEFAULT}
            rounded={Box.roundeds.SMALL}
            padding={Box.paddings.SMALL}
            className="board-preview"

        >
            <Clickable className="board-preview-clickable-element" onClick={() => navigate(`/board/${board._id}`)} ariaLabel="clickable box">
                <Flex direction="Column" align="Stretch"
                    justify="Stretch" >
                    <img src="../src/assets/img/quick_search_recent_board.svg" alt="" />
                    <Flex>
                        <Tooltip content="This board is public, visible to all team members"
                            position={Tooltip.positions.BOTTOM}
                            animationType="expand">

                            <Icon
                                iconType={Icon.type.SVG}
                                icon={Board}
                                iconSize={20}
                                tooltipProps={{ position: "bottom" }} />
                        </Tooltip>

                        {/* 
                    <IconButton
                        ariaLabel="This board is public, visible to all team members"
                        icon={Board}
                        onClick={function noRefCheck() { }}
                        tooltipProps={{ position: "bottom" }}
                    /> */}

                        <Text
                            ellipsis
                            weight="bold"
                            align="start"
                            element="span"
                            style={{ width: '100%' }}
                        >
                            {board.title}
                        </Text>

                        <IconButton
                            ariaLabel="Add to Favorites"
                            icon={Favorite}
                        />
                    </Flex>

                    <Text
                        ellipsis
                        weight="normal"
                        align="start"
                        element="span"
                        color={Text.colors.SECONDARY}
                    >
                        work management &gt; Main workspace
                    </Text>
                </Flex>
            </Clickable >
        </Box>
    </>
}