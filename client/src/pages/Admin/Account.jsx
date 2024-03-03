import { SearchOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Alert, Button, Input, Space, Spin, Table, message} from 'antd';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { deleteAccountApi, lockAccountApi, readAccountApi, unlockAccountApi } from '../../api';

const Account = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);
  const [totalpage, setTotalpage] = useState(0);
  const [currentpage, setCurrentpage] = useState(0);
  const [eventClick, setEventClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentpage(page-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const startTime = new Date();
        const response = await axios.get(readAccountApi(currentpage), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data.medicals);
        setTotalpage(Math.ceil(response.data.data.total / 5));
        console.log(totalpage);
        const endTime = new Date();
        const fetchTime = endTime - startTime;
        setLoadingTime(fetchTime);
      } catch (error) {
        console.error('Error fetching data:', error);
      }finally{
        setTimeout(() =>{
          setLoading(false);
        },3000)
      }
    };
    fetchData();
  }, [token, currentpage, eventClick]);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, loadingTime+1000);
      return () => clearTimeout(timer);
    }
  }, [loading, loadingTime]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleLock = async (id) => {
    try {
      await axios.get(lockAccountApi(id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success('Khóa tài khoản thành công');
      setEventClick(!eventClick);
    } catch (error) {
      console.error('Lỗi khi khóa tài khoản', error);
      message.error('Lỗi khi khóa tài khoản');
    }
  };

  const handleUnlock = async (id) => {
    try {
      await axios.get(unlockAccountApi(id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success('Mở tài khoản thành công');
      setEventClick(!eventClick);
    } catch (error) {
      console.error('Lỗi khi mở tài khoản', error);
      message.error('Lỗi khi mở tài khoản');
    }
  };

  const handleRePassword = (id) => {
    navigate(`/dashboard/account/reissuepass/${id}`);
  };

  const handleCreateAccountDoctor = () => {
    navigate('/dashboard/account/createdoctor');
    setEventClick(!eventClick);
  };

  const handleDeleteAccount = async (id) => {
    try {
      await axios.delete(deleteAccountApi(id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success('Xóa tài khoản thành công');
      setEventClick(!eventClick);
    } catch (error) {
      console.error('Lỗi khi xóa tài khoản', error);
      message.error('Lỗi khi xóa tài khoản');
    }
  };

  function convertRoleToVietnamese(role) {
    switch (role) {
      case 'PATIENT':
        return 'Bệnh nhân';
      case 'DOCTOR':
        return 'Bác sĩ';
      default:
        return role;
    }
  }

  const columns = [
    {
      title: 'Số thứ tự',
      dataIndex: 'sequenceNumber',
      key: 'sequenceNumber',
      render: (_, __, index) => index + 1 + currentpage * 5,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (status ? 'Đang sử dụng' : 'Đã khóa'),
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) => convertRoleToVietnamese(role),
    },
    {
      title: 'Tùy chọn',
      dataIndex: 'options',
      key: 'options',
      render: (_, record) => (
        <>
          {record.status ? (
            <Button className="lock" onClick={() => handleLock(record.id)}>
              Khóa
            </Button>
          ) : (
            <Button className="unlock" onClick={() => handleUnlock(record.id)}>
              Mở
            </Button>
          )}
          <Button className="repass" onClick={() => handleRePassword(record.id)}>
            Cấp lại MK
          </Button>
          <Button className="delete" onClick={() => handleDeleteAccount(record.id)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      { !loading ? (
          <>
            <Button type='primary' size='medium' onClick={handleCreateAccountDoctor}>Tạo tài khoản bác sĩ</Button>
            <Table 
              columns={columns} 
              dataSource={data} 
              pagination={{
                total: totalpage * 5,
                pageSize: 5,
                current: currentpage + 1,
                onChange: handlePageChange,
              }}
            />
          </>
        ) : (
          <Spin tip="Đang load ...">
          <Alert
            message="Hãy chờ một chút"
            description="Đang lấy dữ liệu tài khoản"
            type='info'
          />
        </Spin>
        )
      }
    </div>
  );
};

export default Account;
