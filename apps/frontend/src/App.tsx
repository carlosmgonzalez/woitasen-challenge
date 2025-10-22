import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogNewOrder } from "./components/dialog-new-order";
import { API_URL } from "./utils/constants";
import { Button } from "./components/ui/button";
import { useEffect } from "react";
import { DialogRowTable } from "./components/dialog-row-table";
import type { GetOrdersData } from "@repo/types";
import { NuqsAdapter } from "nuqs/adapters/react";
import { parseAsInteger, parseAsStringLiteral, useQueryState } from "nuqs";
import { Separator } from "./components/ui/separator";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <main className="w-screen h-screen max-w-[1080px] mx-auto">
          <OrdersScreen />
        </main>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}

const StatusOrder = ["ALL", "COMPLETED", "CANCELLED", "PENDING"];

function OrdersScreen() {
  const [orderStatusFilter, setOrderStatusFilter] = useQueryState(
    "state",
    parseAsStringLiteral(StatusOrder).withDefault(StatusOrder[0]),
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const getOrders = async () => {
    const response = await fetch(
      `${API_URL}/orders?limit=5&status=${orderStatusFilter}&page=${page}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = (await response.json()) as GetOrdersData;
    return data;
  };

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["orders", orderStatusFilter, page],
    queryFn: getOrders,
  });

  const queryClt = useQueryClient();

  useEffect(() => {
    if (data && page < data.pagination.totalPages) {
      queryClt.prefetchQuery({
        queryKey: ["orders", orderStatusFilter, page + 1],
        queryFn: async () => {
          const response = await fetch(
            `${API_URL}/orders?limit=5&status=${orderStatusFilter}&page=${page + 1}`,
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return (await response.json()) as GetOrdersData;
        },
      });
    }
  }, [data, page, orderStatusFilter, queryClt]);

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  if (isError) {
    return <div>Error fetching orders.</div>;
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2 px-4">
      <h1 className="font-semibold text-xl">ORDER MANAGEMENT SYSTEM</h1>
      <Separator className="mb-6" />
      <div className="w-full flex justify-between">
        <DialogNewOrder setOrderStatusFilter={setOrderStatusFilter} />
        <Select
          value={orderStatusFilter}
          onValueChange={(value) => {
            setOrderStatusFilter(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status order" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status Order</SelectLabel>
              <SelectItem value="PENDING">PENDING</SelectItem>
              <SelectItem value="COMPLETED">COMPLETED</SelectItem>
              <SelectItem value="CANCELLED">CANCELLED</SelectItem>
              <SelectItem value="ALL">ALL</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableCaption>A list of your orders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.orders.map((order) => (
            <DialogRowTable order={order} key={order.id} />
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end gap-4 self-end py-4">
        <span className="text-sm text-muted-foreground">
          Page {data?.pagination.page} of {data?.pagination.totalPages}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1 || isFetching}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              if (data && page < data.pagination.totalPages) {
                setPage((old) => old + 1);
              }
            }}
            disabled={
              isFetching || !data || page === data.pagination.totalPages
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
