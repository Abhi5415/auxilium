const AWS = require('aws-sdk');

//configuring the AWS environment
AWS.config.update({
	accessKeyId: 'AKIAIUTIQDVE42E737XQ',
	secretAccessKey: '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',
	region: 'us-east-1',
});

const s3 = new AWS.S3();
const rekognition = new AWS.Rekognition();

let getObjects = () => {
	return new Promise((resolve, reject) => {
		let bucket_params = {
			Bucket: 'facial-data',
			MaxKeys: 100,
		};

		s3.listObjectsV2(bucket_params, function(err, data) {
			if (err) console.log(err, err.stack);
			// an error occurred
			else resolve(data.Contents); // successful response
		});
	});
};

let isSameUser = (source, target) => {
	return new Promise(resolve => {
		if (source === target) {
			resolve(false);
			return;
		}
		let params = {
			SimilarityThreshold: 90,
			SourceImage: {
				S3Object: {
					Bucket: 'facial-data',
					Name: source,
				},
			},
			TargetImage: {
				S3Object: {
					Bucket: 'facial-data',
					Name: target,
				},
			},
		};

		rekognition.compareFaces(params, function(err, data) {
			if (err) console.log(err, err.stack);
			else {
				if (data.FaceMatches.length > 0) {
					console.log(source);
					console.log(data);
					resolve(true);
				} else {
					resolve(false);
				}
			} // successful response
		});
	});
};

let isExistingUser = async sourceImageS3 => {
	console.log('here');
	let data = await getObjects();

	let promises = [];

	data.forEach(datum => {
		promises.push(isSameUser(sourceImageS3, datum.Key));
	});

	let res = await Promise.all(promises);

	if (res.includes(true)) return true;
	else return false;
};

isExistingUser('IMG_20190826_170830.jpg').then(res => console.log(res));

// let bucket_params = {
// 	Bucket: 'facial-data',
// 	MaxKeys: 100,
// };

// let registeredUsers = [];

// s3.listObjects(bucket_params, function(err, data) {
// 	console.log(data);
// 	if (err) console.log(err, err.stack);
// 	// an error occurred
// 	else {
// 		console.log('------ The S3 Contents -------');
// 		console.log(data.Contents);
// 		registeredUsers = data.Contents;

// 		registeredUsers.forEach(user => {
// 			if (imageSourceS3 !== user.Key) {
// 				let params = {
// 					SimilarityThreshold: 90,
// 					SourceImage: {
// 						S3Object: {
// 							Bucket: 'facial-data',
// 							Name: imageSourceS3,
// 						},
// 					},
// 					TargetImage: {
// 						S3Object: {
// 							Bucket: 'facial-data',
// 							Name: user.Key,
// 						},
// 					},
// 				};

// 				rekognition.compareFaces(params, function(err, data) {
// 					if (err) console.log(err, err.stack);
// 					// an error occurred
// 					else {
// 						console.log('------ Match Data -------');
// 						console.log(data);
// 						if (data.FaceMatches.length > 0) {
// 							console.log('------ The Match -------');
// 							console.log(user.Key);
// 							return false;
// 						}
// 					} // successful response
// 				});
// 			}
// 		});
// 	} // successful response
// });

// isExistingUser('IMG_20190826_170830.jpg').then(res => console.log(res));
