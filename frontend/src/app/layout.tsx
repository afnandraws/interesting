import type { Metadata } from "next";
import { AppProvider } from "../../redux/provider";

export const metadata: Metadata = {
	title: "Interesting",
	description: "This is an application to find out and save intriguing facts",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" style={{ backgroundColor: "#FCF6EA" }}>
			<body>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}
