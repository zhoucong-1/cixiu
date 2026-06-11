/**
 * Craft 制作工艺页面
 * 哈密刺绣数字图谱 - 制作工艺板块
 */

import React from 'react';
import Layout from '../../components/Layout/Layout';
import './Craft.css';

const Craft: React.FC = () => {
  const materials = [
    {
      name: '优质丝绸',
      description: '选用上等丝绸面料，质地柔软，光泽自然',
      usage: '用于制作高档刺绣作品',
    },
    {
      name: '彩色丝线',
      description: '丰富的色彩选择，色彩鲜艳持久',
      usage: '用于图案绣制',
    },
  ];

  const processes = [
    { step: 1, title: '设计图案', description: '根据需求设计刺绣图案' },
    { step: 2, title: '选材备料', description: '选择合适的布料和丝线' },
    { step: 3, title: '上绷固定', description: '将布料固定在绣架上' },
    { step: 4, title: '开始绣制', description: '按照图案进行绣制' },
    { step: 5, title: '完成整理', description: '完成绣制并进行后期整理' },
  ];

  return (
    <Layout>
      <div className="craft-page">
        <div className="container">
          <section className="page-header">
            <h1 className="page-title">制作工艺</h1>
            <p className="page-subtitle">了解刺绣的材料与工艺流程</p>
          </section>

          {/* 材料详解 */}
          <section className="materials-section">
            <h2 className="section-title">材料详解</h2>
            <div className="materials-grid">
              {materials.map((material, index) => (
                <div key={index} className="material-card">
                  <h3 className="material-name">{material.name}</h3>
                  <p className="material-description">{material.description}</p>
                  <p className="material-usage">{material.usage}</p>
                  <a href="/shop?type=material" className="btn-primary">
                    购买材料
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* 工艺流程 */}
          <section className="process-section">
            <h2 className="section-title">工艺流程</h2>
            <div className="process-container">
              {processes.map((process) => (
                <div key={process.step} className="process-step">
                  <div className="step-number">{process.step}</div>
                  <div className="step-content">
                    <h3 className="step-title">{process.title}</h3>
                    <p className="step-description">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="process-actions">
              <a href="/craft/diy" className="btn-primary">
                购买DIY体验包
              </a>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Craft;

