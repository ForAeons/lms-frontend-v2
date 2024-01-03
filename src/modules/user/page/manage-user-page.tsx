import React from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
	LoaderPage,
	OrderBtn,
	PaginationBar,
	SearchBar,
	SortSelect,
} from "@/modules";
import {
	CheckPermission,
	listUserThunk,
	useAppDispatch,
	useAppSelector,
} from "@/store";
import { useTranslations } from "@/components/language-provider";
import { useQueryParams } from "@/hooks";
import { cqToUrl, getCollectionQuery, isValidCq } from "@/util";
import { CREATE_USER, USER_SORT_OPTIONS } from "@/constants";
import { UserCreateBtn, UserPersonCard } from "..";

export const ManageUserPage: React.FC = () => {
	const translate = useTranslations();
	const dispatch = useAppDispatch();
	const userState = useAppSelector((state) => state.user);
	const canCreateUser = useAppSelector((s) => CheckPermission(s, CREATE_USER));
	const navigate = useNavigate();
	const queryParams = useQueryParams();
	const cq = getCollectionQuery(queryParams);

	React.useEffect(() => {
		const c = new AbortController();
		dispatch(listUserThunk({ q: cq, signal: c.signal }));
		return () => c.abort();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, window.location.search]);

	React.useEffect(() => {
		const isValid = isValidCq(cq, userState.meta.filtered_count);
		if (!isValid) navigate(`?${cqToUrl(cq)}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigate, window.location.search]);

	if (userState.isFetching) return <LoaderPage />;

	const userTitle = translate.manageUsers();

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{userTitle}
				</h2>

				<div className="flex gap-3">
					{canCreateUser && <UserCreateBtn />}
					<SearchBar cq={cq} />
				</div>

				<div className="flex gap-3">
					<OrderBtn cq={cq} />
					<SortSelect cq={cq} opt={USER_SORT_OPTIONS} />
				</div>

				{userState.users.map((u) => {
					return <UserPersonCard key={u.username} userPerson={u} />;
				})}

				<PaginationBar cq={cq} total={userState.meta.filtered_count} />
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};
