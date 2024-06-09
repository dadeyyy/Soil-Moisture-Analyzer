import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SoilMoistureType } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDateRecent } from '@/lib/utils';

const SoilMoistureHistory = ({
  soilMoistureData,
}: {
  soilMoistureData: SoilMoistureType;
}) => {

  const data = soilMoistureData.feeds.sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateB - dateA;
  });
  
  return (
    <Dialog >
      <DialogTrigger asChild>
        <button className="flex flex-row sm:flex-col w-full gap-10 sm:gap-0 hover:bg-slate-500 p-6 rounded-xl cursor-pointer">
          <div className="flex flex-col justify-center items-center gap-2 ">
            <Image src={'/weather.png'} width={35} height={35} alt="weather" />
            <span className="text-xs text-center ">Soil Moisture</span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]  w-4/5 h-4/5 sm:max-h-[700px] overflow-y-auto">
        <DialogTitle>Soil Moisture History</DialogTitle>
        <ScrollArea>
          <Table>
            <TableCaption>
              List of the recent Soil Moisture Contents
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Moisture Content</TableHead>
                <TableHead className="text-right">Date Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((data) => (
                <TableRow key={data.entry_id}>
                  <TableCell className="font-medium">{data.entry_id}</TableCell>
                  <TableCell>{data.field1}%</TableCell>
                  <TableCell className="text-right">
                    {formatDateRecent(new Date(data.created_at)).date}{' '}
                    {formatDateRecent(new Date(data.created_at)).time}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SoilMoistureHistory;
