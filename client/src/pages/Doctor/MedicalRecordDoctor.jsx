import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios'
import moment from 'moment'
import Highlighter from 'react-highlight-words';
import { Alert, Button, Input, Space, Spin, Table, message, Select} from 'antd';
import { readsMedicalPatientAdminApi,
         readMedicalRecordByPatientDoctorApi,} from '../../api'

const MedicalRecordDoctor = () => {

  const [medicalRecords, setMedicalRecords] = useState([]);
  const [patient, setPatient] = useState("");
  const [patientRecords, setPatientRecords] = useState([]);
  const [searchedColumn, setSearchedColumn] = useState('');
  const [totalpage, setTotalpage] = useState(0);
  const [currentpage, setCurrentpage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentpage(page-1);
  };

  const handleCreateMedicalRecord = () => {
    navigate(`/doctor/medical/create`)
  }

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, loadingTime+1000);
      return () => clearTimeout(timer);
    }
  }, [loading, loadingTime]);

  useEffect(() =>{
    const fetchPatientRecords = async () => {
      try {
        const response = await axios.get(readsMedicalPatientAdminApi, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setPatientRecords(response.data.data.medicals);
      } catch (error) {
          console.error('Lỗi khi lấy dữ liệu bệnh nhân', error);
      }
    };
    fetchPatientRecords();
  }, [token]);

  useEffect(() =>{
    const fetchPatient = () => {
        try{
            setCurrentpage("0");
        }catch(error){
            console.log(error)
        }
    };
    fetchPatient();
  }, [patient])

  useEffect(() =>{
    const fetchMedicalsByPatientRecords = async () => {
        try {
            setLoading(true);
            const startTime = new Date();
            const response = await axios.get(readMedicalRecordByPatientDoctorApi(patient, currentpage), {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
            });
            console.log(response.data.data.total)
            setMedicalRecords(response.data.data.medicals);
            setTotalpage(Math.ceil(response.data.data.total / 5));
            const endTime = new Date();
            const fetchTime = endTime - startTime;
            setLoadingTime(fetchTime);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu bệnh nhân', error);
        };
    };
    fetchMedicalsByPatientRecords();
  }, [token, currentpage, patient]);

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

  const handleReadMedicalRecordDetail = (id) => {
    navigate(`/doctor/medical/detail/${id}`)
  }
  
  const handleUpdateMedicalRecord = (id) => {
    navigate(`/doctor/medical/update/${id}`);
  }

  const columns = [
    {
      title: 'Số thứ tự',
      dataIndex: 'sequenceNumber',
      key: 'sequenceNumber',
      render: (_, __, index) => index + 1 + currentpage * 5,
    },
    {
      title: 'Ngày khám',
      dataIndex: 'date',
      key: 'date',
      render: (date) => {
        return moment(date).format('YYYY-MM-DD');
      }
    },
    {
      title: 'Bệnh nhân',
      dataIndex: 'namePatient',
      key: 'namePatient',
      ...getColumnSearchProps('namePatient'),
    },
    {
      title: 'Bác sĩ',
      dataIndex: 'nameDoctor',
      key: 'nameDoctor',
      ...getColumnSearchProps('nameDoctor'),
    },
    {
      title: 'Tùy chọn',
      dataIndex: 'options',
      key: 'options',
      render: (_, record) => (
        <>
          <Button style={{ color: 'black', border: '1px solid black', backgroundColor: 'transparent' }} onClick={() => handleReadMedicalRecordDetail(record.id)}>
            Xem
          </Button>
          <Button style={{ color: 'black', border: '1px solid black', backgroundColor: 'transparent' }} onClick={() => handleUpdateMedicalRecord(record.id)}>
            Cập nhật
          </Button>
        </>
      ),
    },
  ];

  const onChangePatient = (value) => {
    if (typeof value !== 'undefined') {
      console.log(`selected ${value}`);
      setPatient(value);
    } else {
      console.log('Clear selected');
      setPatient("");
    }
    console.log(patient);
  };
  
  const onSearchPatient = (value) => {
    if (typeof value !== 'undefined') {
      console.log(`selected ${value}`);
      setPatient(value);
    } else {
      console.log('Clear selected');
      setPatient("");
    }
    console.log(patient);
  };

  const filterOptionPatient = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const formattedPatientRecords = patientRecords.map(patient => ({
    label: `${patient.email} - ${patient.fullName}`,
    value: patient.id
  }));

  return (
    <div>
      <div className='medicalrecord_container'>
        <Button style={{backgroundColor:"blue", marginBottom:"5px"}}type='primary' size='medium' onClick={handleCreateMedicalRecord}>Tạo hồ sơ bệnh án</Button>
        <br/>
        <Select mode='default'
          showSearch
          allowClear
          style={{width: "400px", marginRight:"5px"}}
          placeholder="Tìm kiếm bệnh nhân"
          optionFilterProp='children' 
          onChange={onChangePatient}
          onSearch={onSearchPatient}
          filterOption={filterOptionPatient}
          options={formattedPatientRecords}
        />
        { !loading ? (
            <>
              <Table 
                columns={columns} 
                dataSource={medicalRecords} 
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
              description="Đang lấy dữ liệu hồ sơ bệnh án"
              type='info'
            />
          </Spin>
          )
        }
      </div>
    </div>
  )
}

export default MedicalRecordDoctor