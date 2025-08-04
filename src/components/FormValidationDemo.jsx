import React, { useState } from 'react';

const FormValidationDemo = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    website: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 验证规则
  const validationRules = {
    username: {
      required: '用户名是必填项',
      minLength: { value: 3, message: '用户名至少需要3个字符' },
      maxLength: { value: 20, message: '用户名不能超过20个字符' },
      pattern: { value: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' },
    },
    email: {
      required: '邮箱是必填项',
      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '请输入有效的邮箱地址' },
    },
    password: {
      required: '密码是必填项',
      minLength: { value: 8, message: '密码至少需要8个字符' },
      pattern: { 
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
        message: '密码必须包含大小写字母、数字和特殊字符' 
      },
    },
    confirmPassword: {
      required: '请确认密码',
      custom: (value) => value === formData.password || '两次输入的密码不一致',
    },
    age: {
      required: '年龄是必填项',
      min: { value: 18, message: '年龄必须大于18岁' },
      max: { value: 100, message: '年龄不能超过100岁' },
      pattern: { value: /^\d+$/, message: '年龄必须是数字' },
    },
    website: {
      pattern: { value: /^https?:\/\/.+/, message: '请输入有效的网址（以http://或https://开头）' },
    },
  };

  // 验证单个字段
  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    // 必填验证
    if (rules.required && !value) {
      return rules.required;
    }

    // 如果字段为空且不是必填，则通过验证
    if (!value && !rules.required) {
      return '';
    }

    // 最小长度验证
    if (rules.minLength && value.length < rules.minLength.value) {
      return rules.minLength.message;
    }

    // 最大长度验证
    if (rules.maxLength && value.length > rules.maxLength.value) {
      return rules.maxLength.message;
    }

    // 模式验证
    if (rules.pattern && !rules.pattern.value.test(value)) {
      return rules.pattern.message;
    }

    // 最小值验证
    if (rules.min && parseInt(value) < rules.min.value) {
      return rules.min.message;
    }

    // 最大值验证
    if (rules.max && parseInt(value) > rules.max.value) {
      return rules.max.message;
    }

    // 自定义验证
    if (rules.custom) {
      return rules.custom(value);
    }

    return '';
  };

  // 验证所有字段
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 实时验证
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 标记所有字段为已触摸
    const allTouched = {};
    Object.keys(formData).forEach(field => {
      allTouched[field] = true;
    });
    setTouched(allTouched);

    // 验证表单
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      
      // 模拟提交
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('表单提交成功！');
      setIsSubmitting(false);
    }
  };

  const getFieldStyle = (fieldName) => ({
    padding: '10px',
    border: `2px solid ${errors[fieldName] ? '#ff4757' : touched[fieldName] ? '#2ed573' : '#ddd'}`,
    borderRadius: '4px',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box',
  });

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>表单验证 Demo</h2>
      <p>演示完整的表单验证功能，包含实时验证和提交验证</p>

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            用户名 *
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            style={getFieldStyle('username')}
            placeholder="请输入用户名（3-20个字符）"
          />
          {errors.username && (
            <div style={{ color: '#ff4757', fontSize: '12px', marginTop: '5px' }}>
              {errors.username}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            邮箱 *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            style={getFieldStyle('email')}
            placeholder="请输入邮箱地址"
          />
          {errors.email && (
            <div style={{ color: '#ff4757', fontSize: '12px', marginTop: '5px' }}>
              {errors.email}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            密码 *
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            style={getFieldStyle('password')}
            placeholder="请输入密码（至少8个字符）"
          />
          {errors.password && (
            <div style={{ color: '#ff4757', fontSize: '12px', marginTop: '5px' }}>
              {errors.password}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            确认密码 *
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            style={getFieldStyle('confirmPassword')}
            placeholder="请再次输入密码"
          />
          {errors.confirmPassword && (
            <div style={{ color: '#ff4757', fontSize: '12px', marginTop: '5px' }}>
              {errors.confirmPassword}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            年龄 *
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            onBlur={handleBlur}
            style={getFieldStyle('age')}
            placeholder="请输入年龄（18-100岁）"
          />
          {errors.age && (
            <div style={{ color: '#ff4757', fontSize: '12px', marginTop: '5px' }}>
              {errors.age}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            个人网站
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            onBlur={handleBlur}
            style={getFieldStyle('website')}
            placeholder="请输入个人网站（可选）"
          />
          {errors.website && (
            <div style={{ color: '#ff4757', fontSize: '12px', marginTop: '5px' }}>
              {errors.website}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '12px 24px',
            background: isSubmitting ? '#ccc' : '#2ed573',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            width: '100%',
          }}
        >
          {isSubmitting ? '提交中...' : '提交表单'}
        </button>
      </form>

      <div style={{ marginTop: '20px', background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
        <h4>表单验证功能：</h4>
        <ul>
          <li>实时验证：输入时立即检查</li>
          <li>失焦验证：离开字段时验证</li>
          <li>提交验证：提交时全面检查</li>
          <li>多种验证规则：必填、长度、格式、自定义等</li>
          <li>视觉反馈：错误状态和成功状态</li>
          <li>防重复提交：提交时禁用按钮</li>
        </ul>
      </div>
    </div>
  );
};

export default FormValidationDemo; 