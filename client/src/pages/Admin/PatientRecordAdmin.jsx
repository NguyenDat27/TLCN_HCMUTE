import { SearchOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Alert, Button, Input, Space, Spin, Table, message} from 'antd';
// import { Search } from Input;
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { searchPatientRecordAdminApi,
          deletePatientRecordAdminApi,
        } from '../../api'; 

const PatientRecordAdmin = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);
  const [totalpage, setTotalpage] = useState(0);
  const [currentpage, setCurrentpage] = useState(0);
  const [eventClick, setEventClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentpage(page-1);
  };

  const handleSearchKeyword = (word) => {
    setSearchClicked(true);
    setCurrentpage(0);
    setKeyword(word)
  }

  useEffect(() => {
    if (!searchClicked) {
      const fetchPatientRecords = async () => {
        try {
          setLoading(true);
          const startTime = new Date();
          const response = await axios.get(searchPatientRecordAdminApi(keyword, currentpage), {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          console.log(response.data.data.medicals)
          setData(response.data.data.medicals);
          setTotalpage(Math.ceil(response.data.data.total/5));
        const endTime = new Date();
        const fetchTime = endTime - startTime;
        setLoadingTime(fetchTime);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu hồ sơ bệnh nhân', error);
        }
      };
      fetchPatientRecords();
    } else {
        const fetchPatientRecords = async () => {
          try {
            setLoading(true);
            const startTime = new Date();
            const response = await axios.get(searchPatientRecordAdminApi(keyword, currentpage), {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.data.medicals)
            setData(response.data.data.medicals);
            setTotalpage(Math.ceil(response.data.data.total / 5));
            const endTime = new Date();
            const fetchTime = endTime - startTime;
            setLoadingTime(fetchTime);
          } catch (error) {
              console.error('Lỗi khi lấy dữ liệu hồ sơ bệnh nhân', error);
          }
        };
        setSearchClicked(false);
        fetchPatientRecords();
    }
  }, [token, currentpage, eventClick, searchClicked]);

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

  const handleCreatePatient = () => {
    navigate("/dashboard/patient/create");
  }

  const handleReadPatientRecord = (id) => {
    navigate(`/dashboard/patient/read/${id}`)
  }
  const handleUpdatePatientRecord = (id) => {
    navigate(`/dashboard/patient/update/${id}`)
  }
  const handleDeletePatientRecord = async(id) => {
    try {
      const res = await axios.delete(deletePatientRecordAdminApi(id),{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.status === 200){
        message.success("Đã xóa")
      }
      if(eventClick){
        setEventClick(false);
      }else{
        setEventClick(true);
      }
    }catch(error){
      console.log(error);
      message.error("Không thể xóa")
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
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'date',
      key: 'date',
      render: (date) => {
        return moment(date).format('YYYY-MM-DD');
      }
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phonenumber',
      key: 'phonenumber',
    },
    {
      title: 'Tùy chọn',
      dataIndex: 'options',
      key: 'options',
      render: (_, record) => (
        <>
          <Button className="read" onClick={() => handleReadPatientRecord(record.id)}>
            Xem
          </Button>
          <Button className="update" onClick={() => handleUpdatePatientRecord(record.id)}>
            Cập nhật
          </Button>
          <Button className="delete" onClick={() => handleDeletePatientRecord(record.id)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type='primary' size='medium' onClick={handleCreatePatient}>Tạo hồ sơ bệnh nhân</Button>
      <br/>
      <Input.Search
        placeholder='Nhập CCCD/CMND hoặc tên của bệnh nhân'
        style={{marginTop: "5px", marginBottom: "5px", width:"400px"}}
        onPressEnter={(value) => handleSearchKeyword(value)}
        onSearch={(value) => handleSearchKeyword(value)}
      />
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
            description="Đang lấy dữ liệu hồ sơ bệnh nhân"
            type='info'
          />
        </Spin>
        )
      }
    </div>
  )
}

export default PatientRecordAdmin