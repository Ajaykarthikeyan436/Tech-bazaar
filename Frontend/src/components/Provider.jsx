import { assets } from "../assets/frontend_assets/assets";

const provider = [
    { id: 1, image: assets.laptop, name: "Computer & Laptop" },
    { id: 2, image: assets.mobile, name: "Mobiles" },
    { id: 3, image: assets.Camera, name: "Camera" },
    { id: 4, image: assets.TV, name: "Television" },
    { id: 5, image: assets.homeapp, name: "Home Appliances" },
    { id: 6, image: assets.access, name: "Accessories" },
];

const Provider = () => {
    return (
        <section className="flex flex-col gap-4 mt-10 ml-5 mr-5">
            <div className="flex gap-3 justify-center">
                <h1 className="text-[20px] sm:text-3xl font-bold">What</h1>
                <p className="text-[20px] sm:text-3xl font-bold text-purple-900">We</p>
                <h1 className="text-[20px] sm:text-3xl font-bold">Provide ?</h1>
            </div>
            <div className="flex justify-between items-center mr-4 mt-5 flex-wrap gap-3 sm:gap-4">
                {
                    provider.map(function (item) {
                        return (
                            <div key={item.id}>
                                <div className="flex flex-col items-center">
                                    <img src={item.image} className="w-10 h-10"></img>
                                    <p>{item.name}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Provider