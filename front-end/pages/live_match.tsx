import { Table, Tag, Space, Button, Avatar } from 'antd';
import axios from 'axios';
import { useEffect, useState } from "react";
// import {Date} from 


const columns = [
    {
        title: 'User1',
        dataIndex: 'User1',
        key: '1',
        render: (res) =>
            <Space>
                <Avatar src={res[1]} />
                <span>{res[0]}</span>
            </Space>,
    },
    {
        title: 'User2',
        dataIndex: 'User2',
        key: '2',
        render: (res) =>
            <Space>
                <Avatar src={res[1]} />
                <span>{res[0]}</span>
            </Space>,
    },
    {
        title: 'Time',
        key: '3',
        dataIndex: 'Time',
        render: Date => {
            return Date;
        }
    },
    {
        title: 'Action',
        key: '4',
        render: (res) => (
            <Space>
                <Button type="primary" onClick={() => {
                }
                }>
                    Accept
                </Button>
                <Button type="danger" onClick={() => {
                }
                }>
                    Reject
                </Button>
            </Space>
        ),
    },
    // {
    //     title: 'Action',
    //     key: 'Action',
    //     render: (text, record) => (
    //         <Space size="middle">
    //             <Button type="primary" onClick={() => {
    //                 console.log(record);
    //             }}>
    //                 View
    //             </Button>
    //         </Space>
    //     ),
    // },
];

// const data = [
//   {
//     key: '1',
//     User1:['nice', 'https://joeschmoe.io/api/v1/random'],
//     Time: 54,
//     // tags: ['nice', 'https://joeschmoe.io/api/v1/random'],
//   },
//   {
//     key: '2',
//     User1: ['nice', 'https://joeschmoe.io/api/v1/random'],
//     Time: 42,
//     // tags: ['nice', 'https://joeschmoe.io/api/v1/random'],
//   },
//   {
//     key: '3',
//     User: ['cool', 'https://joeschmoe.io/api/v1/random'],
//     Time:54,
//     // tags: 
//   },
// ];




export default function MatchLive() {
    const [datas, setData] = useState([]);
    // const [Datasource, setDatasource] = useState([]);
    const fet = async () => {
        await axios.get("http://localhost:3000/game/current/")
            .then(res => {
                if (datas['id'] === undefined) {
                    setData(res.data);
                }
            });
    }


    // console.log(data);
    // useEffect(() => {
    // if (Datasource.length === 0) {
    // const inter = setInterval(() => {
    // if(Datasource.length === 0){
    //     fet();
    // }
    //     }
    //     else
    //     {
    //         clearInterval(inter);
    //     }
    // console.log(Datasource.length);
    // }, 1000);

    // }
    // else {
    // console.log(Datasource);
    // }
    // }, []);
  const ISSERVER = typeof window === "undefined";
    
    if (datas.length === 0 && !ISSERVER) {
        fet();
    }
    else {
        // console.log(datas);
    }
    return (
        <div>
            {
                <Table loading={!datas.length} columns={columns} dataSource={datas} pagination={{ pageSize: 7 }} />
            }
        </div>
    );
}