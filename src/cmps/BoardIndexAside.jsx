import { Box, Button, Text } from "monday-ui-react-core"


export function BoardIndexAside() {

    return <>
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
    </>
}