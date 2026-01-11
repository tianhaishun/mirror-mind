import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Health() {
  const [status, setStatus] = useState<'checking' | 'ok' | 'error'>('checking')
  const [details, setDetails] = useState<string>('')

  useEffect(() => {
    async function check() {
      try {
        const { data, error } = await supabase.from('posts').select('id').limit(1)
        if (error) {
          setStatus('error')
          setDetails(`Supabase 错误: ${error.message}`)
        } else {
          setStatus('ok')
          setDetails(`连接正常 · posts条目: ${data?.length ?? 0}`)
        }
      } catch (e: any) {
        setStatus('error')
        setDetails(`运行时错误: ${e?.message || String(e)}`)
      }
    }
    check()
  }, [])

  return (
    <div className="max-w-xl mx-auto mt-24 glass-panel p-8 rounded-3xl animate-fade-in">
      <h1 className="title-medium mb-6 text-mirror-text-primary">系统健康检查</h1>
      <div className="space-y-4">
        <div className={`px-4 py-3 border rounded-none font-mono text-sm ${
          status === 'ok'
            ? 'border-green-500/30 text-green-400'
            : status === 'error'
            ? 'border-red-500/30 text-red-400'
            : 'border-mirror-border/20 text-mirror-text-secondary'
        }`}>
          状态: {status === 'checking' ? '检测中…' : status === 'ok' ? '正常' : '异常'}
        </div>
        {details && (
          <pre className="bg-mirror-base/50 border border-mirror-border/10 p-4 rounded-none text-mirror-text-secondary text-xs overflow-auto">
            {details}
          </pre>
        )}
        <div className="text-mirror-text-secondary text-sm">
          如果状态异常，请在 Supabase 控制台检查：Site URL/Allowed Redirect URLs 是否包含你当前访问域名。
        </div>
      </div>
    </div>
  )
}

