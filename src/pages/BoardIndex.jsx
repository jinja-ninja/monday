import { Box, Button, Counter, Flex, IconButton, Text, useHover } from "monday-ui-react-core"
import { Board, Favorite } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"

export function BoardIndex() {

    return <main className="board-index">
        <section className="desktop-component-body">
            <Box
                rounded={Box.roundeds.MEDIUM}
                shadow={Box.shadows.MEDIUM}
                padding={Box.paddings.MEDIUM}
                margin={Box.marginYs.LARGE}
                className="main-panel-container"
            >
                <div className="collapsible-header-wrapper">
                    <Text
                        weight="bold"
                        align="start"
                        element="span"
                    >
                        (Collapsible arrow) Recently visited
                    </Text>
                </div>

                <section className="collapsible-content">
                    <Box
                        border={Box.borders.DEFAULT}
                        rounded={Box.roundeds.SMALL}
                        padding={Box.paddings.SMALL}
                        className="card card-1"
                    >
                        <Flex direction="Column" align="Stretch"
                            justify="Stretch" >
                            <img src="../src/assets/img/quick_search_recent_board.svg" alt="" />
                            <Flex>
                                <IconButton
                                    ariaLabel="This board is public, visible to all team members"
                                    icon={Board}
                                    onClick={function noRefCheck() { }}
                                    tooltipProps={{ position: "bottom" }}
                                />


                                <Text
                                    ellipsis
                                    weight="bold"
                                    align="start"
                                    element="span"
                                    style={{ width: '100%' }}
                                >
                                    Long Text Test Board for you buddy and if you want I can send you another poem or something so you'll have more text here!
                                </Text>

                                <IconButton
                                    ariaLabel="Add to Favorites"
                                    icon={Favorite}
                                    onClick={function noRefCheck() { }}
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
                    </Box>

                    <Box
                        border={Box.borders.DEFAULT}
                        rounded={Box.roundeds.SMALL}
                        padding={Box.paddings.SMALL}
                        className="card card-2"
                    >
                        <Flex direction="Column" align="Stretch"
                            justify="Stretch" >
                            <img src="../src/assets/img/quick_search_recent_board.svg" alt="" />
                            <Flex>
                                <IconButton
                                    ariaLabel="This board is public, visible to all team members"
                                    icon={Board}
                                    onClick={function noRefCheck() { }}
                                    tooltipProps={{ position: "bottom" }}
                                />


                                <Text
                                    ellipsis
                                    weight="bold"
                                    align="start"
                                    element="span"
                                    style={{ width: '100%' }}
                                >
                                    Test Board
                                </Text>

                                <IconButton
                                    ariaLabel="Add to Favorites"
                                    icon={Favorite}
                                    onClick={function noRefCheck() { }}
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
                    </Box>
                </section>

                <div className="collapsible-header-wrapper">
                    <Text
                        weight="bold"
                        align="start"
                        element="span"
                    >
                        (Collapsible arrow) Update feed (inbox)
                    </Text>
                    <Counter count={1} />
                </div>
            </Box>

            <section className="right-panel-container">
                <Box
                    rounded={Box.roundeds.MEDIUM}
                    shadow={Box.shadows.MEDIUM}
                    padding={Box.paddings.SMALL}
                    margin={Box.marginYs.LARGE}
                    className="explore-templates-container"
                >
                    <img src="../src/assets/img/templates-banner.png" alt="" />

                    <div className="banner-content-wrapper">
                        <Text type="text1" maxLines={2} className="banner-text">
                            Boost your workflow in minutes with ready-made templates
                        </Text>

                        <Button kind={Button.kinds.SECONDARY} className="banner-button">Explore templates</Button>
                    </div>
                </Box>

                <section className="get-inspired-content-wrapper">
                    <Text type="text1" color="primary" className="get-inspired-text">
                        Learn & get inspired
                    </Text>

                    <Box
                        rounded={Box.roundeds.MEDIUM}
                        padding={Box.paddings.SMALL}
                        margin={Box.marginYs.LARGE}
                        className="navigation-card-component">

                        <img src="../src/assets/img/get-started-2.svg" alt="" />

                        <div className="card-content">
                            <Text type="text1" color="primary"
                                weight={Text.weights.BOLD} className="card-title">
                                Getting started
                            </Text>

                            <Text type="text2" color="primary" className="card-text">
                                Learn how monday.com works
                            </Text>
                        </div>

                    </Box>

                    <Box
                        rounded={Box.roundeds.MEDIUM}
                        padding={Box.paddings.SMALL}
                        margin={Box.marginYs.LARGE}
                        className="navigation-card-component">

                        <img src="../src/assets/img/help-center.svg" alt="" />

                        <div className="card-content">
                            <Text type="text1" color="primary"
                                weight={Text.weights.BOLD} className="card-title">
                                Help center
                            </Text>

                            <Text type="text2" color="primary" className="card-text">
                                Learn and get support
                            </Text>
                        </div>

                    </Box>

                    <Box
                        rounded={Box.roundeds.MEDIUM}
                        padding={Box.paddings.SMALL}
                        margin={Box.marginYs.LARGE}
                        className="navigation-card-component">

                        <img src="../src/assets/img/webinars.svg" alt="" />

                        <div className="card-content">
                            <Text type="text1" color="primary"
                                weight={Text.weights.BOLD} className="card-title">
                                Join a webinar
                            </Text>

                            <Text type="text2" color="primary" className="card-text">
                                Watch a live walkthrough
                            </Text>
                        </div>

                    </Box>
                </section>
            </section>
        </section>
    </main >
}