import { Button, Checkbox, Input } from '@nextui-org/react';
import { Typography } from 'antd';

const { Title } = Typography;

export default function Login() {
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-4">
          <Title>Deer Coffee</Title>
          <Title level={5} disabled className="mt-0.5">
            The best coffee in town
          </Title>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Title level={5}>Email</Title>
            <Input label="Email" radius="sm" size="sm" isRequired className="w-full mb-3" />
          </div>
          <div>
            <Title level={5}>Password</Title>
            <Input label="Password" radius="sm" size="sm" isRequired className="w-full mb-3" />
          </div>
          <Checkbox className="mb-2">Remember me</Checkbox>
          <Button type="submit" color="primary" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
