import { SearchOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Alert, Button, Input, Space, Spin, Table, message} from 'antd';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { deleteDoctorApi, readsDoctorApi, } from '../../api';

const Doctor = () => {
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
        const response = await axios.get(readsDoctorApi(currentpage), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data.doctors);
        setTotalpage(Math.ceil(response.data.data.total / 5));
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
  const handleReadDoctor = async (id) => {
    navigate(`/dashboard/doctor/detail/${id}`);
  }
  const handleUpdateDoctor = async (id) => {
    navigate(`/dashboard/doctor/update/${id}`);
  }
  const handleDeleteDoctor = async (id) => {
    try {
      await axios.delete(deleteDoctorApi(id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success('Xóa bác sĩ thành công');
      setEventClick(!eventClick);
    } catch (error) {
      console.error('Lỗi khi xóa tài khoản', error);
      message.error('Lỗi khi xóa tài khoản');
    }
  };

  const columns = [
    {
      title: 'Số thứ tự',
      dataIndex: 'sequenceNumber',
      key: 'sequenceNumber',
      render: (_, __, index) => index + 1 + currentpage * 5,
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
      ...getColumnSearchProps('fullName'),
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthday',
      key: 'birthday',
      render: (birthday) => {
        return moment(birthday).format('YYYY-MM-DD');
      }
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
    {
      title: 'Tùy chọn',
      dataIndex: 'options',
      key: 'options',
      render: (_, record) => (
        <>
          <Button className="read" onClick={() => handleReadDoctor(record.id)}>
            Xem
          </Button>
          <Button className="update" onClick={() => handleUpdateDoctor(record.id)}>
            Cập nhật
          </Button>
          <Button className="delete" onClick={() => handleDeleteDoctor(record.id)}>
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
            description="Đang lấy dữ liệu bác sĩ"
            type='info'
          />
        </Spin>
        )
      }
    </div>
  );
};

export default Doctor;
