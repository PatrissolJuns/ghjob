import AsyncStorage from '@react-native-community/async-storage';

export const getAsyncData = (storageKey) => {
	return new Promise((resolve, reject) => {
		AsyncStorage
			.getItem('@' + storageKey)
			.then(value => {
				if (value !== null) resolve(value);
				else reject(null);
			}).catch(error => reject(error));
	});
};

export const getAsyncObjectData = (storageKey) => {
	return new Promise((resolve, reject) => {
		AsyncStorage
			.getItem('@' + storageKey)
			.then(value => {
				if (value !== null) resolve(JSON.parse(value));
				else reject(null);
			}).catch(error => reject(error));
	});
};

export const setAsyncData = (storageKey, value) => {
	return new Promise((resolve, reject) => {
		AsyncStorage
			.setItem('@' + storageKey, value)
			.then(() => resolve())
			.catch(error => reject(error));
	});
};

export const setAsyncObjectData = (storageKey, object) => {
	return new Promise((resolve, reject) => {
		AsyncStorage
			.setItem('@' + storageKey, JSON.stringify(object))
			.then(() => resolve())
			.catch(error => reject(error));
	});
};

export const removeAsyncData = (storageKey) => {
	return new Promise((resolve, reject) => {
		AsyncStorage
			.removeItem('@' + storageKey)
			.then(() => resolve())
			.catch(error => reject(error));
	});
};
