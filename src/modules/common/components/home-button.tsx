import React from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HomeBtn: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Button variant={"ghost"} size={"icon"} onClick={() => navigate("/")}>
			<Home />
			<span className="sr-only">Go to Home</span>
		</Button>
	);
};

export default HomeBtn;
