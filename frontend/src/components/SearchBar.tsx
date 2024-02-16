import { FC, useEffect, useState } from "react";
import { ArrowRight, Search, XCircleIcon } from "lucide-react";
import { Label } from "./ui/label";
import axiosInstance from "@/api/axiosInstance";
import { useToast } from "./ui/use-toast";

interface SearchBarProps {
  setRecepient: React.Dispatch<React.SetStateAction<User | null>>;
}

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
}

const SearchBar: FC<SearchBarProps> = ({ setRecepient }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [searchResultsDivOpen, setSearchResultsDivOpen] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [filter]);

  useEffect(() => {
    const bulkUser = async () => {
      try {
        const res = await axiosInstance.get(
          `/user/bulk?filter=${debouncedFilter}`
        );
        const usersArr = res.data.users;
        setUsers(usersArr);
      } catch (error) {
        toast({
          description:
            "Sorry! Currently we are facing issues fetching the users.",
        });
        console.error("Error fetching users:", error);
      }
    };

    if (debouncedFilter !== "") {
      bulkUser();
    } else {
      setUsers([]);
    }
  }, [debouncedFilter]);

  const handleUserItemClick = (user: User) => {
    setFilter(`${user.firstName} ${user.lastName}`);
    setRecepient(user);
    setSearchResultsDivOpen(false);
  };

  const handleClearSearchBar = () => {
    setFilter("");
  };

  return (
    <div className="relative flex justify-center">
      <div className="flex gap-2 justify-center items-center border border-zinc-400/50 rounded-full bg-background w-full md:w-[80%] lg:w-[60%] px-4 py-1 mx-auto">
        <Label htmlFor="search" className="cursor-pointer">
          <Search />
        </Label>
        <input
          id="search"
          type="text"
          value={filter || ""}
          className="flex h-10 w-full rounded-md outline-none border-none px-4 
          bg-background focus:outline-none focus:ring-transparent active:outline-none"
          placeholder="Search users..."
          onChange={(e) => setFilter(e.target.value)}
        />
        {filter && (
          <XCircleIcon
            className="cursor-pointer"
            onClick={handleClearSearchBar}
          />
        )}
      </div>
      {users.length > 0 && searchResultsDivOpen && (
        <div className="w-full md:w-[80%] lg:w-[60%] mx-auto mt-2 rounded-xl bg-background px-3 py-4 absolute z-10 top-12">
          {users.map((user, index) => (
            <div
              key={user._id}
              className={`flex justify-between items-center px-4 py-2 bg-background hover:bg-slate-500/50 rounded-md cursor-pointer ${
                index !== users.length - 1 ? "border-b border-zinc-400/30" : ""
              }`}
              onClick={(e) => {
                handleUserItemClick(user);
                e.stopPropagation();
              }}
            >
              <span>
                {user.firstName} {user.lastName}
              </span>
              <ArrowRight />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
