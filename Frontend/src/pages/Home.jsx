import Banner from "../components/Banner"
import Provider from "../components/Provider"
import LatestCollection from "../components/LatestCollection"
import BestSeller from "../components/BestSeller"
import OurPolicy from "../components/OurPolicy"
import NewsletterBox from "../components/NewsletterBox"

function Home() {

    return (
        <div>
            <Banner />
            <Provider />
            <LatestCollection />
            <BestSeller />
            <OurPolicy />
            <NewsletterBox />
        </div>
    )
}

export default Home