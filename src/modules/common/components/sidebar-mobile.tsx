import React from "react";
import { useNavigate } from "react-router-dom";
import {
	BookCheckIcon,
	BookDownIcon,
	BookIcon,
	BookKeyIcon,
	HelpingHandIcon,
	LandmarkIcon,
	LibraryBigIcon,
	LogInIcon,
	LogOutIcon,
	MenuIcon,
	UserCogIcon,
	WalletIcon,
} from "lucide-react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { logoutThunk, useAppDispatch, useAppSelector } from "@/store";

export const SideBarMobileBtn: React.FC = () => {
	const dispatch = useAppDispatch();
	const isLoggedIn = useAppSelector((s) => s.app.isLoggedIn);
	const navigate = useNavigate();
	return (
		<NavigationMenu className="lg:hidden z-50">
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>
						<MenuIcon className="transition duration-200 group-data-[state=open]:rotate-90" />
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="flex flex-col gap-3 p-3">
							{isLoggedIn && (
								<li className="row-span-3">
									<NavigationMenuLink asChild>
										<Button
											variant="ghost"
											className="w-full justify-start"
											onClick={() => dispatch(logoutThunk())}
										>
											<LogInIcon height={16} />
											<p className="ml-3">Sign Out</p>
											<span className="sr-only">Sign Out</span>
										</Button>
									</NavigationMenuLink>
								</li>
							)}

							{!isLoggedIn && (
								<li className="row-span-3">
									<NavigationMenuLink asChild>
										<Button
											variant="ghost"
											className="w-full justify-start"
											onClick={() => navigate("/signin")}
										>
											<LogOutIcon height={16} />
											<p className="ml-3">Sign in</p>
											<span className="sr-only">Sign In</span>
										</Button>
									</NavigationMenuLink>
								</li>
							)}

							<li className="row-span-3">
								<NavigationMenuLink asChild>
									<Button
										variant="ghost"
										className="w-full justify-start"
										onClick={() => navigate("/book")}
									>
										<BookIcon height={16} />
										<p className="ml-3">Book</p>
										<span className="sr-only">Book resources</span>
									</Button>
								</NavigationMenuLink>
							</li>

							{isLoggedIn && (
								<>
									<li className="row-span-3">
										<NavigationMenuLink asChild>
											<Button
												variant="ghost"
												className="w-full justify-start"
												onClick={() => navigate("/reservation")}
											>
												<BookDownIcon height={16} />
												<p className="ml-3">Reservation</p>
												<span className="sr-only">Reservation resources</span>
											</Button>
										</NavigationMenuLink>
									</li>

									<li className="row-span-3">
										<NavigationMenuLink asChild>
											<Button
												variant="ghost"
												className="w-full justify-start"
												onClick={() => navigate("/loan")}
											>
												<BookCheckIcon height={16} />
												<p className="ml-3">Loan</p>
												<span className="sr-only">Loan resources</span>
											</Button>
										</NavigationMenuLink>
									</li>

									<li className="row-span-3">
										<NavigationMenuLink asChild>
											<Button
												variant="ghost"
												className="w-full justify-start"
												onClick={() => navigate("/fine")}
											>
												<WalletIcon height={16} />
												<p className="ml-3">Fine</p>
												<span className="sr-only">Fine resources</span>
											</Button>
										</NavigationMenuLink>
									</li>
								</>
							)}

							{isLoggedIn && (
								<>
									<li className="row-span-3">
										<NavigationMenuLink asChild>
											<Button
												variant="ghost"
												className="w-full justify-start"
												onClick={() => navigate("/manage_user")}
											>
												<UserCogIcon height={16} />
												<p className="ml-3">Manage User</p>
												<span className="sr-only">Manage user</span>
											</Button>
										</NavigationMenuLink>
									</li>

									<li className="row-span-3">
										<NavigationMenuLink asChild>
											<Button
												variant="ghost"
												className="w-full justify-start"
												onClick={() => navigate("/manage_book")}
											>
												<BookKeyIcon height={16} />
												<p className="ml-3">Manage Book</p>
												<span className="sr-only">Manage book</span>
											</Button>
										</NavigationMenuLink>
									</li>

									<li className="row-span-3">
										<NavigationMenuLink asChild>
											<Button
												variant="ghost"
												className="w-full justify-start"
												onClick={() => navigate("/manage_reservation")}
											>
												<LibraryBigIcon height={16} />
												<p className="ml-3">Manage Reservation</p>
												<span className="sr-only">Manage reservation</span>
											</Button>
										</NavigationMenuLink>
									</li>

									<li className="row-span-3">
										<NavigationMenuLink asChild>
											<Button
												variant="ghost"
												className="w-full justify-start"
												onClick={() => navigate("/manage_loan")}
											>
												<HelpingHandIcon height={16} />
												<p className="ml-3">Manage Loan</p>
												<span className="sr-only">Manage loan</span>
											</Button>
										</NavigationMenuLink>
									</li>

									<li className="row-span-3">
										<NavigationMenuLink asChild>
											<Button
												variant="ghost"
												className="w-full justify-start"
												onClick={() => navigate("/manage_fine")}
											>
												<LandmarkIcon height={16} />
												<p className="ml-3">Manage Fine</p>
												<span className="sr-only">MManage fine</span>
											</Button>
										</NavigationMenuLink>
									</li>
								</>
							)}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};

export default SideBarMobileBtn;
