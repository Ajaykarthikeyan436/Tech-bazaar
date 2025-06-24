import { assets } from "../assets/frontend_assets/assets"
import "../index.css"

function Banner() {

    return (
        <div className="m-5 flex relative">
            <div className="w-[100%] relative">
                <img src={assets.banner1} className="w-[100%] h-48 md:h-[100%]"></img>
            </div>
            <div className="w-[100%] relative">
                <img src={assets.banner2} className="w-[100%] h-48 md:h-[100%]"></img>
            </div>
            <div className="animated-text">
                <div>
                    <p>Grab</p>
                    <p className="highlight">50%</p>
                </div>
                <div>
                    <p>Off SmartPhone</p>
                </div>
                <div>
                    <p>Collection</p>
                </div>
            </div>
        </div>
    )
}

export default Banner