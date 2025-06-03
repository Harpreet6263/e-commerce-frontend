import { useState } from "react";
import AWS from "aws-sdk";
import Image from "next/image";

export default function FileUpload({
    acceptedTypes = ["video/mp4", "video/webm", "video/quicktime"],
    maxSizeMB = 30,
    maxDuration = 60,
    onSuccess,
    onError,
    label = "Upload File",
    fieldName = "file",
    bucketName,
    region,
    accessKeyId,
    secretAccessKey,
    isVideo = true,
    acceptedFileTypes = isVideo ? ["video/mp4", "video/webm", "video/quicktime"] : ["image/jpeg", "image/png", "image/gif"],
    maxFileSizeMB = maxSizeMB,
    maxFileDuration = maxDuration,
    requiredImageWidth,
    requiredImageHeight,
    selectData,
    isMandatory
}) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);

    // AWS S3 Configuration
    AWS.config.update({
        accessKeyId,
        secretAccessKey,
        region,
    });
    const myBucket = new AWS.S3({
        params: { Bucket: bucketName },
        region,
    });

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;

        if (!acceptedFileTypes.includes(selectedFile.type)) {
            setError("Invalid file type. Please upload a valid file.");
            onError && onError("Invalid file type");
            return;
        }

        if (selectedFile.size > maxFileSizeMB * 1024 * 1024) {
            setError(`File size should be less than ${maxFileSizeMB}MB.`);
            onError && onError("File size exceeded");
            return;
        }

        if (isVideo) {
            const videoElement = document.createElement("video");
            videoElement.preload = "metadata";
            videoElement.src = URL.createObjectURL(selectedFile);

            videoElement.onloadedmetadata = () => {
                URL.revokeObjectURL(videoElement.src);
                if (videoElement.duration > maxFileDuration) {
                    setError(`Video should be less than ${maxFileDuration} seconds.`);
                    onError && onError("Duration exceeded");
                    return;
                }
                if (videoElement.videoHeight <= videoElement.videoWidth) {
                    setError("Video must be in portrait mode.");
                    onError && onError("Invalid video orientation");
                    return;
                }
                setError("");
                setFile(selectedFile);
                uploadFileToS3(selectedFile);
            };
        } else {
            setError("");
            setFile(selectedFile);
            uploadFileToS3(selectedFile);
        }
    };
    const uploadFileToS3 = (file) => {
        if (!file) return;

        const timestamp = Date.now(); // Get current timestamp
        const fileExtension = file.name.split('.').pop(); // Get file extension
        const uniqueFileName = `${file.name.replace(/\.[^/.]+$/, "")}_${timestamp}.${fileExtension}`; // Append timestamp

        const params = {
            ACL: "public-read",
            Body: file,
            Bucket: bucketName,
            Key: uniqueFileName, // Use the unique file name
            ContentType: file.type,
        };

        myBucket.upload(params, (err, data) => {
            if (err) {
                setError("Error uploading file.");
                onError && onError(err);
            } else {
                setUploadProgress(100);
                const fileSizeMB = Math.ceil(file.size / (1024 * 1024));
                onSuccess && onSuccess(data.Location, fileSizeMB);
            }
        }).on("httpUploadProgress", (evt) => {
            setUploadProgress(Math.round((evt.loaded / evt.total) * 100));
        });
    };


    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                <span> {label} {" "}{isMandatory && <span className="text-red-500 mr-2">*</span>}</span>
                {!isVideo && requiredImageWidth && requiredImageHeight && (
                    <span style={{ color: "#10B981" }}>
                        (Preferred image size: {requiredImageWidth}×{requiredImageHeight})
                    </span>
                )}
            </label>
            <input
                type="file"
                name={fieldName}
                accept={acceptedFileTypes.join(",")}
                onChange={handleFileChange}
                className="mt-2 block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-3"
            />
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            {uploadProgress > 0 && (
                <div className="mt-2">
                    <p className="text-sm text-primary">Uploading: {uploadProgress}%</p>
                    <div className="bg-gray-200 rounded-full h-2.5 mt-1">
                        <div
                            className="bg-primary h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                </div>
            )}
            {selectData && typeof selectData === "string" && (
                selectData.match(/\.(jpeg|jpg|gif|png|svg|webp|bmp|tiff)$/i) ||
                    selectData.startsWith("data:image") ? (
                    <div className="mt-2 flex justify-left">
                        <Image
                            src={selectData}
                            alt="Selected File"
                            width={100}
                            height={100}
                            className="rounded-md object-cover w-[150px] h-[150px]"
                        />
                    </div>
                ) : (
                    <p className="mt-2 "> Image URL: {selectData}</p>
                )
            )}

        </div>
    );
}
