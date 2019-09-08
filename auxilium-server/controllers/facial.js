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
			resolve({ exists: false, matchingFace: '' });
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
					resolve({ exists: true, matchingFace: target });
				} else {
					resolve({ exists: false, matchingFace: '' });
				}
			} // successful response
		});
	});
};

exports.isExistingUser = async sourceImageS3 => {
	let data = await getObjects();

	let promises = [];

	data.forEach(datum => {
		promises.push(isSameUser(sourceImageS3, datum.Key));
	});

	let res = await Promise.all(promises);

	let result = res.find(datum => datum.exists);
	if (result === undefined) return { exists: false, matchingFace: '' };
	else {
		result.matchingFace = `https://facial-data.s3.amazonaws.com/${result.matchingFace}`;
		return result;
	}
};

isExistingUser('sherry1.jpg').then(res => console.log(res));
