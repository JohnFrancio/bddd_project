const Form = () => {
    return (
        <div className="w-full">
            <form className=" bg-amber-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-32">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Add File here
                    </label>
                    <input type="file" accept=".txt" className=" border border-amber-300" />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Add To Database
                    </button>
                </div>
            </form>
        </div>

    );
};

export default Form;
