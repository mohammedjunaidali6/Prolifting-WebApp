import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ButtonGroup, ToggleButton, Dropdown, DropdownButton, Form, Button } from 'react-bootstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import DateRangePicker from "react-bootstrap-daterangepicker";
import { Line, Doughnut, HorizontalBar } from "react-chartjs-2";

import {
    setDurationToDaily,
    setDurationToMonthly,
    setDurationToYearly,
    setDurationToStartEndDate,
    getDashboardData,
    selectCategory,
    getCategoryDashboardData,
    addClientIdToFilter,
    addSiteIdToFilter,
    removeClientIdFromFilter,
    removeSiteIdFromFilter,
    resetSiteAndClientFromFilter,
} from '../../data/reducers/dashboard.reducer';
import { getAllDropdowns } from "../../data/reducers/configuration-data.reducer";

const colors = ["#0074D9", "#FF4136", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"];

const Dashboard = () => {
    const dispatch = useDispatch();

    const { filterOptions, dashboardData, categoryDashboardData } = useSelector(state => state.dashboardReducer);
    const { sites, clients, categories } = useSelector(state => state.configurationReducer);

    const siteFilterRef = useRef();
    const clientFilterRef = useRef();

    useEffect(() => {
        dispatch(getAllDropdowns());
    }, [])

    const [clientShow, setClientShow] = useState(false);
    const handleClientDrowdownToggle = (isOpen, event, metadata) => {
        if (isOpen || metadata.source !== 'select') {
            setClientShow(isOpen);
        }
        if (event !== undefined && event.persist) event.persist();
    }

    const [siteDrodownShow, setSiteDropdownShow] = useState(false);
    const handleSiteDropdownToggle = (isOpen, event, metadata) => {
        if (isOpen || metadata.source !== 'select') {
            setSiteDropdownShow(isOpen);
        }
        if (event !== undefined && event.persist) event.persist();
    }

    // useEffect(() => {
    //     dispatch(getDashboardData(filterOptions));
    //     if (filterOptions.categoryId > 0) {
    //         dispatch(getCategoryDashboardData(filterOptions));
    //     }
    // }, [filterOptions])

    const refreshDashboardData = async () => {
        await dispatch(getDashboardData(filterOptions));
    };

    const refreshCategoryDashboardData = async () => {
        await dispatch(getCategoryDashboardData(filterOptions));
    }

    const resetSelections = async () => {
        await dispatch(resetSiteAndClientFromFilter());
        var options = { ...filterOptions };
        options.siteId = [];
        options.clientId = [];
        await dispatch(getDashboardData(options));
        await dispatch(getCategoryDashboardData(options));
        if (clientFilterRef && siteFilterRef) {
            clientFilterRef.current.resetSelectedValues();
            siteFilterRef.current.resetSelectedValues();
        }
    }

    useEffect(() => {
        refreshDashboardData();
    }, []);

    useEffect(() => {
        if (filterOptions.categoryId > 0) {
            refreshCategoryDashboardData();
        }
    }, [filterOptions.categoryId]);

    useEffect(() => {
        if (filterOptions.categoryId === 0 && categories !== undefined && categories.length > 0) {
            dispatch(selectCategory(categories[0].id));
        }
    }, [categories]);

    useEffect(() => {
        refreshDashboardData();
        if (filterOptions.categoryId > 0) {
            refreshCategoryDashboardData();
        }
    }, [filterOptions.daily, filterOptions.monthly, filterOptions.yearly]);

    return (
        <>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Home</li>
            </ol>
            <div className="col-md-12 card">
                <div className="card-body">
                    <div className="row">
                        <ButtonGroup toggle className='col-md-6'>
                            <ToggleButton
                                type='radio'
                                name='radio'
                                value='daily'
                                checked={filterOptions.daily === true}
                                onChange={(e) => { if (e.currentTarget.checked) dispatch(setDurationToDaily()) }}
                            >
                                Daily
                            </ToggleButton>
                            <ToggleButton
                                type='radio'
                                name='radio'
                                value='monthly'
                                checked={filterOptions.monthly === true}
                                onChange={(e) => { if (e.currentTarget.checked) dispatch(setDurationToMonthly()) }}
                            >
                                Monthly
                            </ToggleButton>
                            <ToggleButton
                                type='radio'
                                name='radio'
                                value='yearly'
                                checked={filterOptions.yearly === true}
                                onChange={(e) => { if (e.currentTarget.checked) dispatch(setDurationToYearly()) }}
                            >
                                Yearly
                            </ToggleButton>
                            {/* <ToggleButton
                                type='radio'
                                name='radio'
                                value='yearly'
                                checked={filterOptions.daily === false && filterOptions.monthly === false && filterOptions.yearly === false}
                            >
                                Custom
                            </ToggleButton> */}
                        </ButtonGroup>
                        <div className='offset-md-2 col-md-4 text-right'>
                            <DateRangePicker
                                onApply={(e, s) => { dispatch(setDurationToStartEndDate({ startDate: s.startDate, endDate: s.endDate })) }}
                                initialSettings={{ startDate: new Date(filterOptions.startDate), endDate: new Date(filterOptions.endDate) }}>
                                <button className='btn btn-primary'>{filterOptions.startDate === null && filterOptions.endDate === null ? 'Select Custom Range' : ((new Date(filterOptions.startDate)).toLocaleDateString('en-UK', { day: '2-digit', month: 'short', year: 'numeric' }) + ' to ' + (new Date(filterOptions.endDate)).toLocaleDateString('en-UK', { day: '2-digit', month: 'short', year: 'numeric' }))}</button>
                            </DateRangePicker>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-4">
                            <Multiselect
                                placeholder="Filter Sites"
                                ref={siteFilterRef}
                                showCheckbox={true}
                                options={sites}
                                displayValue="siteName"
                                onSelect={(selectedList, selectedItem) => {
                                    dispatch(addSiteIdToFilter(selectedItem.id))
                                }}
                                onRemove={(selectedList, removedItem) => {
                                    dispatch(removeSiteIdFromFilter(removedItem.id))
                                }}
                            />
                        </div>
                        <div className="col-md-4">
                            <Multiselect
                                placeholder="Filter Clients"
                                ref={clientFilterRef}
                                showCheckbox={true}
                                options={clients}
                                displayValue="clientName"
                                className="col-md-4"
                                onSelect={(selectedList, selectedItem) => {
                                    dispatch(addClientIdToFilter(selectedItem.id))
                                }}
                                onRemove={(selectedList, removedItem) => {
                                    dispatch(removeClientIdFromFilter(removedItem.id))
                                }}
                            />
                        </div>
                        <div className="col-md-4 d-flex">
                            <button className='btn btn-primary ml-3' onClick={(e) => { refreshDashboardData(); refreshCategoryDashboardData(); }}>Filter</button>
                            <button className='btn btn-link' onClick={(e) => { resetSelections(); }}>reset</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12 card mt-3">
                <div className="card-body">
                    <h3>Overall Performance</h3>
                    <div className="row">
                        <div className="col-md-12" style={{ height: '50vh' }}>
                            {dashboardData?.performances ?
                                <Line
                                    data={{
                                        labels: dashboardData.performances.map(perf => perf.dateOverall),
                                        datasets: [
                                            {
                                                data: dashboardData.performances.map(perf => perf.numberOfObservations),
                                                label: 'overall # of observations',
                                                borderColor: 'rgba(44, 130, 201, 1)',
                                                backgroundColor: 'rgba(44, 130, 201, 0.2)'
                                            }
                                        ],
                                    }}
                                    options={{
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                }
                                            }]
                                        },
                                        responsive: true,
                                        maintainAspectRatio: false
                                    }} />
                                : ''}
                        </div>
                    </div>
                    <h3 className='mt-3'>Category Wise Performance</h3>
                    <div className="row mt-3">
                        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
                            {dashboardData?.categories ?
                                <Doughnut
                                    data={{
                                        labels: dashboardData.categories.map(category => (category.category)),
                                        datasets: [{
                                            data: dashboardData.categories.map(category => category.frequency),
                                            backgroundColor: dashboardData.categories.map((category, index) => { if (category.category === "Good Practice") { return "#32a852" } else { return colors[index] } })
                                        }]
                                    }}
                                    options={{
                                        legend: {
                                            display: false
                                        }
                                    }}
                                />
                                : ''}
                        </div>
                        <div className="col-md-6" style={{ height: '60vh' }}>
                            {dashboardData?.categories ?
                                <HorizontalBar
                                    data={{
                                        labels: dashboardData.categories.map(category => (category.category)),
                                        datasets: [{
                                            label: 'observations per category',
                                            data: dashboardData.categories.map(category => category.frequency),
                                            backgroundColor: dashboardData.categories.map((category, index) => { if (category.category === "Good Practice") { return "#32a852" } else { return colors[index] } })
                                        }]
                                    }}
                                    options={{
                                        scales: {
                                            xAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                }
                                            }]
                                        },
                                        responsive: true,
                                        maintainAspectRatio: false
                                    }}
                                />
                                : ''}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12 card mt-3">
                <div className="card-body">
                    <h3>Single Category Performance</h3>
                    <div className='mt-3'>
                        <DropdownButton
                            variant='secondary'
                            title={categories.find(category => category.id === filterOptions.categoryId) !== undefined ? categories.find(category => category.id === filterOptions.categoryId).categoryName : 'Select Category'}>
                            {categories.map(category => (
                                <Dropdown.Item key={category.id} onSelect={(e) => { dispatch(selectCategory(category.id)) }}>
                                    {category.categoryName}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>
                    <div className="row">
                        <div className="col-md-12" style={{ height: '50vh' }}>
                            {categoryDashboardData ?
                                <Line
                                    data={{
                                        labels: categoryDashboardData.map(data => data.dateOverall),
                                        datasets: [{
                                            label: '# of observations of selected category',
                                            data: categoryDashboardData.map(data => data.frequency),
                                            borderColor: 'rgba(44, 130, 201, 1)',
                                            backgroundColor: 'rgba(44, 130, 201, 0.2)'
                                        }]
                                    }}
                                    options={{
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                }
                                            }]
                                        },
                                        responsive: true,
                                        maintainAspectRatio: false
                                    }}
                                />
                                : ''}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
