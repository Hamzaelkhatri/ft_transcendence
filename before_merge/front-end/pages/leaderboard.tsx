import { Table, Tag, Space, Button, Avatar } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from "react";
import axios from 'axios';
import { width } from '@mui/system';




export default function Leaderboard() {
    // console.log("leaderboard");
    const [state, setstate] = useState([]);
    const [loading, setloading] = useState(true);
    // const [Datasource, setDatasource] = useState([]);


    const getData = async () => {
        await axios.get("http://backdend:3000/user/leaderboard")
            .then(res => {
                setloading(false);
                setstate(res.data);
            });
        // console.log(datas);
    }
    const columns = [
        {
            key: '1',
            title: 'Name',
            dataIndex: 'Name',
            width: '7.5%',
            render: (res) =>
                <Space>
                    <Avatar src={res[1]} />
                    <span>{res[0]}</span>
                </Space>,
        },
        {
            key: '2',
            title: 'Rank',
            dataIndex: 'Rank',
            width: '7.5%',
            sorter: {
                compare: (a, b) => a.Rank - b.Rank,
            },
        },
        {
            key: '3',
            title: 'Country',
            dataIndex: 'Contry',
            width: '7.5%',
        }
    ];
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <div>
                <Table loading={!state.length} columns={columns}
                    dataSource={state} pagination={{ pageSize: 7 }}
                    scroll={{ y: 500 }}
                    style={{ width: 'auto', }}
                />
            </div>
        </div>
    );
}