import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useBlockUserMutation,
  useGetAllUserQuery,
  useUnBlockUserMutation,
} from "@/redux/features/user/userApi";
import { toast } from "sonner";

const ManageUsers = () => {
  // Fetch users
  const { data, isLoading } = useGetAllUserQuery(undefined);
  const [blockUser] = useBlockUserMutation();
  const [unBlockUser] = useUnBlockUserMutation();
  const users = data?.data.result;

  const handleBlock = async (userId: string) => {
    const res = await blockUser(userId);
    if(res.data.success){
        toast.success('Block user successfully')
    }
  };

  const handleUnblock = async (userId: string) => {
    const res = await unBlockUser(userId);
    if(res.data.success){
        toast.success('Unblock user successfully')
    }
  };

  if (isLoading)
    return <div className="text-center py-4">Loading Users...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user:any) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Select
                      defaultValue={user.isBlocked ? "Block" : "Unblock"}
                      onValueChange={(value) =>
                        value === "Block"
                          ? handleBlock(user._id)
                          : handleUnblock(user._id)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={user.isBlocked ? "Blocked" : "Unblocked"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Block">Block</SelectItem>
                        <SelectItem value="Unblock">Unblock</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageUsers;
