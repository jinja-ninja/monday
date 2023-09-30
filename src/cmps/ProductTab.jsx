import { Button } from "monday-ui-react-core";

export function ProductTab() {

    console.log('Button:', Button)

    return <div className="product-tab-layout">
        <section className="product-tab-content">
            <h1>Example</h1>
            <Button onClick={function noRefCheck() { }}>
                Button
            </Button>
        </section>
    </div>
}