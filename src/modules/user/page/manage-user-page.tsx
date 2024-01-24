import React from "react";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTranslations } from "@/components/language-provider";
import {
  LoadingPage,
  OrderBtn,
  PaginationBar,
  SearchBar,
  SortSelect,
} from "@/modules";
import { CheckPermission, useAppSelector } from "@/store";
import { useCollectionQuery, useValidateCqOrReroute } from "@/hooks";
import {
  getNextPage,
  getPreviousPage,
  hasNextPage,
  hasPreviousPage,
} from "@/util";
import { CREATE_USER, USER_SORT_OPTIONS } from "@/constants";
import { UserRoutes, userApi } from "@/api";
import { UserCreateBtn, UserPersonCard } from "..";

export const ManageUserPage: React.FC = () => {
  const cq = useCollectionQuery();

  const { status, data } = useQuery({
    queryKey: [UserRoutes.BASE, cq],
    queryFn: ({ signal }) => userApi.ListUser(cq, signal),
    placeholderData: keepPreviousData,
  });

  useValidateCqOrReroute(cq, data?.meta.filtered_count);

  // prefetch previous and next page
  const queryClient = useQueryClient();
  if (hasPreviousPage(cq)) {
    const prevCq = getPreviousPage(cq);
    queryClient.prefetchQuery({
      queryKey: [UserRoutes.BASE, prevCq],
      queryFn: ({ signal }) => userApi.ListUser(prevCq, signal),
    });
  }
  if (hasNextPage(cq)) {
    const nextCq = getNextPage(cq);
    queryClient.prefetchQuery({
      queryKey: [UserRoutes.BASE, nextCq],
      queryFn: ({ signal }) => userApi.ListUser(nextCq, signal),
    });
  }

  const canCreateUser = useAppSelector((s) => CheckPermission(s, CREATE_USER));
  const translate = useTranslations();
  const userTitle = translate.manageUsers();

  return (
    <ScrollArea className="lg:h-[100dvh] space-y-1 lg:space-y-4 lg:py-4">
      <div className="w-full grid grid-cols-1 gap-3 px-3">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {userTitle}
        </h2>

        {(status === "pending" || !data) && <LoadingPage />}

        {!(status === "pending" || !data) && (
          <>
            <div className="flex gap-3">
              {canCreateUser && <UserCreateBtn />}
              <SearchBar cq={cq} />
            </div>

            <div className="flex gap-3">
              <OrderBtn cq={cq} />
              <SortSelect cq={cq} opt={USER_SORT_OPTIONS} />
            </div>

            {data.data.map((u) => (
              <UserPersonCard key={u.username} userPerson={u} />
            ))}

            <PaginationBar cq={cq} total={data.meta.filtered_count} />
          </>
        )}
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};
