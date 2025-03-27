"use client";
import TableDeleteDataComponent from "@/component/TableComponetDelete/TableDeleteData";
import { PaymentStatus } from "@/interface/enum";
import { formatNumberShowDigit, formatTimeVN } from "@/utils";
import { IconCheck, IconX, IconEdit } from "@tabler/icons-react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Tooltip
} from "@mui/material";
import { useState, useContext } from "react";
import ModalAction from "@/component/ModalConfirmDelete/ModalAction";
import MessageClientContext from "@/providers/MessageProvider";
import { useRouter } from "next/navigation";
import { useRechargeTransaction } from "@/hooks/transaction";
const TRANSACTION_STATUS = {
  PENDING: PaymentStatus.PENDING,
  SUCCESS: PaymentStatus.SUCCESS,
  ERROR: PaymentStatus.ERROR,
  REJECTED: PaymentStatus.REJECTED,
  ALL: "all"
} as const;

const statusButtons = [
  { label: "TẤT CẢ", value: TRANSACTION_STATUS.ALL, color: "#2196F3" },
  { label: "CHỜ XÁC NHẬN", value: TRANSACTION_STATUS.PENDING, color: "#FFA500" },
  { label: "THÀNH CÔNG", value: TRANSACTION_STATUS.SUCCESS, color: "#4CAF50" },
  { label: "THẤT BẠI", value: TRANSACTION_STATUS.ERROR, color: "#f44336" },
  { label: "ĐÃ TỪ CHỐI", value: TRANSACTION_STATUS.REJECTED, color: "#f44336" },
];

export default function RechargePage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [userId, setUserId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [status, setStatus] = useState<string>(TRANSACTION_STATUS.ALL);
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"approve" | "reject" | null>(null);
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [rechargeAmount, setRechargeAmount] = useState<number>(0);
  const [bankName, setBankName] = useState<string>("Vietcombank");
  const [bankCode, setBankCode] = useState<string>("Vietcombank");
  const [accountNumber, setAccountNumber] = useState<string>("1234567890");
  const [accountName, setAccountName] = useState<string>("CÔNG TY TNHH MICHAEL KOR");
  const [withdrawPassword, setWithdrawPassword] = useState<string>("");
  const { handleSuccessMessage, handleErrorMessage } = useContext(MessageClientContext);

  const { mutateAsync: rechargeTransaction, isPending: isRecharging } = useRechargeTransaction();

  const router = useRouter();

  const changeSortColumn = (columnName: string, typeSort: string) => {
    setSortColumn(columnName);
    setSortOrder(typeSort);
  };

  const handleOpenModal = (id: string, type: "approve" | "reject") => {
    setSelectedId(id);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setSelectedId(null);
    setModalType(null);
  };

  const handleFilter = (updates: any) => {
    setPage(1);
    Object.entries(updates).forEach(([key, value]) => {
      switch (key) {
        case 'search':
          setSearch(value as string);
          break;
        case 'dateRange':
          setDateRange(value as { start: string, end: string });
          break;
        case 'userId':
          setUserId(value as string);
          break;
        case 'paymentMethod':
          setPaymentMethod(value as string);
          break;
        case 'status':
          setStatus(value as string);
          break;
        case 'sortColumn':
          setSortColumn(value as string);
          break;
        case 'sortOrder':
          setSortOrder(value as string);
          break;
        case 'bankAccountNumber':
          setBankAccountNumber(value as string);
          break;
      }
    });
  };

  const clearAllFilters = () => {
    setPage(1);
    setSearch("");
    setDateRange({ start: "", end: "" });
    setUserId("");
    setPaymentMethod("");
    setStatus(TRANSACTION_STATUS.ALL);
    setSortColumn("");
    setSortOrder("asc");
    setBankAccountNumber("");
  };

  const handleRecharge = async () => {
    try {
      if (!rechargeAmount || rechargeAmount <= 0) {
        handleErrorMessage("Vui lòng nhập số tiền hợp lệ");
        return;
      }

      if (!bankName || !bankCode || !accountNumber || !accountName || !withdrawPassword) {
        handleErrorMessage("Vui lòng điền đầy đủ thông tin");
        return;
      }

      const response = await rechargeTransaction({
        amount: rechargeAmount,
        bankName: bankName,
        bankCode: bankCode,
        accountNumber: accountNumber,
        accountName: accountName,
        withdrawPassword: withdrawPassword
      });

      if (response && response.status) {
        handleSuccessMessage("Yêu cầu nạp tiền đã được gửi thành công");
        setRechargeAmount(0);
        setWithdrawPassword("");
      } else {
        handleErrorMessage("Yêu cầu nạp tiền thất bại");
      }
    } catch (error) {
      handleErrorMessage("Có lỗi xảy ra khi gửi yêu cầu nạp tiền");
    }
  };

  const columns = [
    {
      title: "STT",
      key: "stt",
      width: 60,
      fixed: "left",
      render: (_value: any, _records: any, index: number) => {
        return <span>{index + 1 + (page - 1) * limit}</span>;
      },
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      fixed: "left",
    },
    {
      title: "Ngày yêu cầu",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      sorter: true,
      render: (date: string) => formatTimeVN(date),
    },
    {
      title: "UID User",
      dataIndex: "userId",
      key: "userId",
      width: 100,
      sorter: true,
      render: (userId: string) => (
        <Tooltip title='Quản lý người dùng'>
          <span
            className="text-white bg-[#4DBADB] px-2 py-1 rounded-[2px] hover:cursor-pointer"
            onClick={() => router.push(`/users/manage/${userId}`)}
          >
            {userId ? `ID-${userId}` : "Không có thông tin"}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Số tài khoản",
      dataIndex: "bankAccountNumber",
      key: "bankAccountNumber",
      width: 150,
    },
    {
      title: "Tên tài khoản",
      dataIndex: "bankAccountName",
      key: "bankAccountName",
      width: 200,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: string) => {
        let color = "";
        let text = "";

        switch (status) {
          case PaymentStatus.PENDING:
            color = "text-yellow-600 bg-yellow-50 border-yellow-200";
            text = "Chờ xác nhận";
            break;
          case PaymentStatus.SUCCESS:
            color = "text-green-600 bg-green-50 border-green-200";
            text = "Thành công";
            break;
          case PaymentStatus.ERROR:
            color = "text-red-600 bg-red-50 border-red-200";
            text = "Thất bại";
            break;
          default:
            color = "text-gray-600 bg-gray-50 border-gray-200";
            text = status;
        }

        return (
          <span className={`inline-block px-3 py-1 rounded-full text-sm border whitespace-nowrap ${color}`}>
            {text}
          </span>
        );
      },
    },
    {
      title: "Số tiền",
      dataIndex: "realAmount",
      key: "realAmount",
      width: 120,
      sorter: true,
      render: (amount: number) => (
        <div className="whitespace-nowrap">{formatNumberShowDigit(amount)} đ</div>
      ),
    },
    {
      title: "Chức năng",
      key: "actions",
      width: 120,
      fixed: "right",
      render: (_: any, record: any) => (
        <div className="flex justify-center gap-2">
          {record.status === PaymentStatus.PENDING && (
            <>
              <Tooltip title="Duyệt yêu cầu">
                <IconCheck
                  className="hover:cursor-pointer"
                  color="#008400"
                  onClick={() => handleOpenModal(record.id, "approve")}
                  size={20}
                />
              </Tooltip>

            </>
          )}
          <Tooltip title="Chỉnh sửa">
            <IconEdit
              className="hover:cursor-pointer"
              color="#5D87FF"
              size={20}
              onClick={() => router.push(`/cash-operations/update/${record.id}`)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];


  return (
    <div className="p-4">
      {/* Form nạp tiền */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Tạo yêu cầu nạp tiền mới
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 2 }}>
          <TextField
            size="small"
            label="Ngân hàng"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            fullWidth
          />
          <TextField
            size="small"
            label="Mã ngân hàng"
            value={bankCode}
            onChange={(e) => setBankCode(e.target.value)}
            fullWidth
          />
          <TextField
            size="small"
            label="Số tài khoản"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            fullWidth
          />
          <TextField
            size="small"
            label="Tên tài khoản"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            fullWidth
          />
          <TextField
            size="small"
            label="Số tiền nạp (VNĐ)"
            type="number"
            value={rechargeAmount || ''}
            onChange={(e) => setRechargeAmount(Number(e.target.value))}
            fullWidth
            inputProps={{ min: 0 }}
          />
          <TextField
            size="small"
            label="Mật khẩu rút tiền"
            type="password"
            value={withdrawPassword}
            onChange={(e) => setWithdrawPassword(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleRecharge}
            disabled={isRecharging || !rechargeAmount || rechargeAmount <= 0}
          >
            {isRecharging ? "Đang xử lý..." : "Nạp tiền"}
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Yêu cầu nạp tiền
          </Typography>

          {/* Add Clear Filters Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button
              color="error"
              variant="outlined"
              onClick={clearAllFilters}
            >
              Xóa bộ lọc
            </Button>
          </Box>

          {/* Status Filter Buttons */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {statusButtons.map(({ label, value, color }) => (
              <Button
                key={value}
                variant={status === value ? "contained" : "outlined"}
                size="small"
                onClick={() => handleFilter({ status: value })}
                sx={{
                  minWidth: '120px',
                  backgroundColor: status === value ? color : `${color}10`,
                  borderColor: color,
                  fontWeight: status === value ? 600 : 400,
                  opacity: status === value ? 1 : 0.6,
                  color: status === value ? 'white' : color,
                  '&:hover': {
                    backgroundColor: status === value ? color : `${color}10`,
                    borderColor: color,
                  },
                  '&.MuiButton-contained': {
                    backgroundColor: color,
                    '&:hover': {
                      backgroundColor: color,
                    }
                  }
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          {/* Search Filters */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 2,
            mb: 3
          }}>
            <TextField
              size="small"
              placeholder="Tìm kiếm theo Mã giao dịch"
              fullWidth
              value={search}
              onChange={(e) => handleFilter({ search: e.target.value })}
            />
            <TextField
              size="small"
              type="date"
              label="Từ ngày"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={dateRange.start}
              onChange={(e) => handleFilter({
                dateRange: { ...dateRange, start: e.target.value }
              })}
            />
            <TextField
              size="small"
              type="date"
              label="Đến ngày"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={dateRange.end}
              onChange={(e) => handleFilter({
                dateRange: { ...dateRange, end: e.target.value }
              })}
            />
            <TextField
              size="small"
              placeholder="ID User"
              fullWidth
              value={userId}
              onChange={(e) => handleFilter({ userId: e.target.value })}
            />
            <TextField
              size="small"
              placeholder="Số tài khoản ngân hàng"
              fullWidth
              value={bankAccountNumber}
              onChange={(e) => handleFilter({ bankAccountNumber: e.target.value })}
            />
          </Box>
        </Box>
      </Paper>

      <ModalAction
        title=""
        isModalOpen={!!modalType}
        setIsModalOpen={handleCloseModal}
        nameTitle={modalType === "approve" ? "Duyệt yêu cầu" : "Từ chối yêu cầu"}
        contentQuestion={`Bạn có chắc chắn muốn ${modalType === "approve" ? "duyệt" : "từ chối"
          } yêu cầu nạp tiền này không?`}
        handleActionSubmit={() => { }}
        nameButtonClose="Không"
        nameButtonSubmit="Có"
      />
    </div>
  );
}
