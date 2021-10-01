const updateTableData = (data, payload) => {
	const { _id } = payload;
	return data.map((i) => {
		if (i._id === _id) {
			return {
				...i,
				...payload,
			};
		} else {
			return i;
		}
	});
};

module.exports = {
	updateTableData,
};
