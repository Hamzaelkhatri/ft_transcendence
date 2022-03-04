import { Table, Tag, Space, Button, Avatar } from 'antd';
import axios from 'axios';
import { useEffect, useState } from "react";



const columns = [
    {
        title: 'User',
        dataIndex: 'User',
        key: '1',
        render: (text, Avatar1) => {
            <Space>
                <Avatar src={Avatar1} />
                <h4> text </h4>
            </Space>
        },
    },
    {
        title: 'Conter',
        dataIndex: 'Conter',
        key: '2',
        render: (text, Avatar1) => {
            <Space>
                <Avatar src={Avatar1} />
                <h4> text </h4>
            </Space>
        }
    },
    {
        title: 'Time',
        key: '3',
        dataIndex: 'Time',
        render: Date => {
            var date = new Date(Date);
            var now = new Date();
            var diff = (now.getTime() - date.getTime()) / 1000;
            diff /= 60;
            return Math.abs(Math.round(diff));
        }
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

// //   {
// //     key: '1',
// //     name: 'John Brown',
// //     age: 32,
// //     address: 'New York No. 1 Lake Park',
// //     tags: ['nice', 'developer'],
// //   },
// //   {
// //     key: '2',
// //     name: 'Jim Green',
// //     age: 42,
// //     address: 'London No. 1 Lake Park',
// //     tags: ['loser'],
// //   },
// //   {
// //     key: '3',
// //     name: 'Joe Black',
// //     age: 32,
// //     address: 'Sidney No. 1 Lake Park',
// //     tags: ['cool', 'teacher'],
// //   },
// ];




export default function MatchLive() {
    const [data, setData] = useState([]);
    const [Datasource, setDatasource] = useState([]);
    useEffect(() => {
        const fet = async () => {
            await axios.get("http://localhost:3000/game/current/")
                .then(res => {
                    setData(res.data);
                }).finally(() => {
                    let count = 0;
                    data.map(item => {
                        setDatasource
                            (
                                [
                                    ...Datasource,
                                    {
                                        key: count,
                                        User: item.user1.name,
                                        Conter: item.user2.name,
                                        Time: item.TimeBegin,
                                    }
                                ]
                            )
                        count++;
                    })
                    console.log(Datasource);
                });

        }
        // if (Datasource.length === 0) {
        // const inter = setInterval(() => {
        //     if(Datasource.length === 0){
        fet();
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
    }, []);
    return (
        <div>
            {
                //fetch DataSource
                Datasource.length === 0 ?
                    <div>
                        <h1>Loading...</h1>
                    </div>
                    :
                    // <Table columns={columns} dataSource={Datasource} />
                    Datasource.map(item => {
                        return (
                            <div>
                                <h1>{item.User} vs {item.Conter}</h1>
                                <h1>{item.Time}</h1>
                            </div>
                        )
                    })
            }
        </div>
    );
}