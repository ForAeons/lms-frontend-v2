import React from "react";
import {
	Html5Qrcode,
	Html5QrcodeCameraScanConfig,
	Html5QrcodeFullConfig,
	QrcodeErrorCallback,
	QrcodeSuccessCallback,
} from "html5-qrcode";

const qrscannerID = "html5qr-code-scanner";

type QRScannerProps = {
	config?: Html5QrcodeFullConfig;
	cameraConfig?: Html5QrcodeCameraScanConfig;
	onSuccessfulScan: QrcodeSuccessCallback;
	onScanError?: QrcodeErrorCallback;
};

export const QRScanner: React.FC<QRScannerProps> = (props) => {
	const previewRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (!previewRef.current) return;
		const s = new Html5Qrcode(qrscannerID, props.config);
		const started = s
			.start(
				{ facingMode: "environment" },
				props.cameraConfig,
				props.onSuccessfulScan,
				props.onScanError,
			)
			.then(() => true);

		return () => {
			started.then(() => {
				s.stop();
			});
		};
	}, [
		props.config,
		props.cameraConfig,
		props.onSuccessfulScan,
		props.onScanError,
	]);

	return <div id={qrscannerID} ref={previewRef} />;
};
