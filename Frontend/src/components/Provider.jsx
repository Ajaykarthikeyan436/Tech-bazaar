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
            <div className="flex gap-3 justify-center text-[20px] sm:text-3xl font-bold">
                <h1>What</h1>
                <p className="text-purple-900">We</p>
                <h1>Provide ?</h1>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-between items-center gap-6 sm:gap-8 px-4 py-5">
                {provider.map((item) => (
                    <div key={item.id} className="flex flex-col items-center w-20 sm:w-24 md:w-28">
                        <img src={item.image} alt={item.name} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                        <p className="text-sm text-center mt-2">{item.name}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Provider