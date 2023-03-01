const { MONGO_URI } = process.env;

import mongoose from "mongoose";
const connectDB = async () => {
	try {
		const promise = async () => {
			return new Promise((resolve: any, rejects: any) => {
				mongoose.connect(
					`${MONGO_URI}`,
					error => {
						if (error) {
							rejects(error);
						} else {
							resolve("Connect successfully to database!");
						}
					},
				);
			});
		};
		const resolve = await promise();
		console.log(resolve);
	} catch (error: any) {
		console.log(error.message);
	}
};

export { connectDB };
