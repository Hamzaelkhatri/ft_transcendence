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
        await axios.get("http://localhost:3000/user/leaderboard")
            .then(res => {
                setloading(false);
                setstate(res.data.map(row => ({
                    image_url: row.image_url,
                    Name: row.name,
                    Rank: row.wins,
                    Contry: "Morocco",
                })));
            });
        // console.log(datas);
    }

    // const ISSERVER = typeof window === "undefined";

    // if (state.length === 0 && !ISSERVER) {
    //     getData();

    // }
    // else {
    //     // console.log(datas);
    // }
    const columns = [


        {

            title: 'Name',
            image_url   : 'image_url',
            dataIndex: 'Name',
            // key: '1',
            width: '10%',
            // render: (res) =>
            //     <Space>
            //         <Avatar src={res[1]} />
            //         <span>{res[0]}</span>
            //     </Space>,
            // render: (res) => {
            //     //     return (
            //     <Space>
            //         <Avatar src={res[0]} />
            //         {/* //             <span>{Name}</span> */}

            // //         </Space>
            //     //     );
            // }
        },

        {
            title: 'Rank',
            dataIndex: 'Rank',
            // key: '2',
            width: '7.5%',
            sorter: {
                compare: (a, b) => a.Rank - b.Rank,
            },


            // render: (res) =>
            //     <Space>
            //         <Avatar src={res[1]} />
            //         <span>{res[0]}</span>
            //     </Space>,
        },
        {
            title: 'Contry',
            dataIndex: 'Contry',
            // key: '3',
            width: '7.5%',

            //rennder textAlign
            // render: (res) => {
            //     return res.data.Country;
            // }

            // render: (res) =>
            //     <Space>
            //         <Avatar src={res[1]} />
            //         <span>{res[0]}</span>
            //     </Space>,

        },
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
                />
            </div>
        </div>
    );
}

