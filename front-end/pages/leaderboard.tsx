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
        await axios.get("http://10.12.7.14:3000/user/leaderboard")
            .then(res => {
                setloading(false);
                setstate(res.data.map(row => ({
                    Name: [row.name, row.image],
                    Rank: row.wins,
                    Contry: "Morocco",
                })));
            });
        // console.log(datas);
    }
    const columns = [


        {

            title: 'Name',
            dataIndex: 'Name',
            key: '1',
            width: '10%',
            render: (res) =>
                <Space>
                    <Avatar src={res[1]} />
                    <span>{res[0]}</span>
                </Space>,
        },

        {
            title: 'Rank',
            dataIndex: 'Rank',
            key: '2',
            width: '7.5%',
            sorter: {
                compare: (a, b) => a.Rank - b.Rank,
            },
        },
        {
            title: 'Contry',
            dataIndex: 'Contry',
            key: '3',
            width: '7.5%',
        },
    ];
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <div style={{ textAlign: 'center', width: '100%', position: 'absolute' }}>
                <Table loading={!state.length} columns={columns}
                    dataSource={state} pagination={{ pageSize: 7 }}
                    scroll={{ y: 500 }}
                    style={{ width: '50%', }}
                />
            </div>
        </div>
    );
}

